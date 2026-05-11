import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import type { NextRequest } from "next/server";

export function withRole(
  allowedRoles: string[],
  handler: (req: NextRequest, context: any) => Promise<NextResponse>
) {
  return auth(async (req, context) => {
    const session = req.auth;
    if (!session?.user) {
      return NextResponse.json({ success: false, error: { code: "AUTH_REQUIRED" } }, { status: 401 });
    }

    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.json({ success: false, error: { code: "FORBIDDEN" } }, { status: 403 });
    }

    // Pass the request to the handler
    return handler(req as any, context);
  }) as any;
}
