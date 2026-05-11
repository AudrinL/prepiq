import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { withOrgRole } from "@/shared/middleware/withOrgRole";
import { withRateLimit } from "@/shared/middleware/withRateLimit";
import { checkOrgLimits } from "@/features/organizations/lib/limits";

async function inviteMemberHandler(req: Request, context: { params: { slug: string } }) {
  try {
    const params = await context.params;
    const slug = params.slug;
    const body = await req.json();
    const { email, role } = body;

    if (!email || !role) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const org = await prisma.organization.findUnique({ where: { slug } });
    if (!org) return NextResponse.json({ success: false }, { status: 404 });

    const limitCheck = await checkOrgLimits(org.id);
    if (!limitCheck.allowed) {
      return NextResponse.json(
        { success: false, error: { code: "LIMIT_EXCEEDED", message: limitCheck.message } },
        { status: 402 }
      );
    }

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Create skeleton user for invitation
      user = await prisma.user.create({
        data: { email, name: email.split("@")[0], isActive: false },
      });
    }

    // Create member relation
    const member = await prisma.orgMember.create({
      data: {
        orgId: org.id,
        userId: user.id,
        role,
      },
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit("org", withOrgRole(["ADMIN", "MANAGER"], inviteMemberHandler as any));
