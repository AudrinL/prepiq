import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redis } from "@/shared/lib/redis";

export function withIdempotency(
  handler: (req: NextRequest, context: any) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: any) => {
    if (req.method !== "POST" && req.method !== "PATCH") {
      return handler(req, context);
    }

    const idempotencyKey = req.headers.get("Idempotency-Key");
    if (!idempotencyKey) {
      return handler(req, context);
    }

    // Check if the request has already been processed
    const cacheKey = `idempotency:${idempotencyKey}`;
    const cachedResponse = await redis.get<{ status: number; body: any; headers: any }>(cacheKey);

    if (cachedResponse) {
      return NextResponse.json(cachedResponse.body, {
        status: cachedResponse.status,
        headers: cachedResponse.headers,
      });
    }

    // Process the request
    const response = await handler(req, context);

    // Cache the response if it was successful (2xx) or a conflict (409)
    if (response.status >= 200 && response.status < 300 || response.status === 409) {
      const responseData = await response.clone().json().catch(() => ({}));
      await redis.set(
        cacheKey,
        {
          status: response.status,
          body: responseData,
          headers: Object.fromEntries(response.headers.entries()),
        },
        { ex: 86400 } // 24 hours
      );
    }

    return response;
  };
}
