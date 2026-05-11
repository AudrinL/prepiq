import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import type { NextRequest } from "next/server";

export function withOrgRole(
  allowedOrgRoles: string[],
  handler: (req: NextRequest, context: any) => Promise<NextResponse>
) {
  return auth(async (req, context) => {
    const session = req.auth;
    if (!session?.user) {
      return NextResponse.json({ success: false, error: { code: "AUTH_REQUIRED" } }, { status: 401 });
    }

    const params = await context?.params;
    const orgSlug = params?.slug;
    if (!orgSlug) {
      return NextResponse.json({ success: false, error: { code: "VALIDATION_ERROR", message: "Missing org slug" } }, { status: 400 });
    }

    const userOrg = session.user.organizations?.find((org) => org.orgSlug === orgSlug);

    if (!userOrg || !allowedOrgRoles.includes(userOrg.orgRole)) {
      return NextResponse.json({ success: false, error: { code: "FORBIDDEN" } }, { status: 403 });
    }

    // Pass the request to the handler
    return handler(req as any, context);
  }) as any;
}
