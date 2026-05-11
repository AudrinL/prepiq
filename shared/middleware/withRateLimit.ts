import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/shared/lib/redis";

export const limiters = {
  public: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(60, "1 m") }),
  authenticated: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(300, "1 m") }),
  org: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(1000, "1 m") }),
  auth: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 m") }),
  submit: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "1 m") }),
};

export function withRateLimit(
  limiterName: keyof typeof limiters,
  handler: (req: NextRequest, context: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: any) => {
    const ip = req.ip ?? req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const limiter = limiters[limiterName];

    const { success, limit, remaining, reset } = await limiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { success: false, error: { code: "RATE_LIMITED", message: "Too many requests" } },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
            "Retry-After": Math.ceil((reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const response = await handler(req, context);
    response.headers.set("X-RateLimit-Limit", limit.toString());
    response.headers.set("X-RateLimit-Remaining", remaining.toString());
    response.headers.set("X-RateLimit-Reset", reset.toString());
    return response;
  };
}
