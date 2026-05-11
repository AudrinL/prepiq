import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { withOrgRole } from "@/shared/middleware/withOrgRole";

async function getOrgHandler(req: Request, context: { params: { slug: string } }) {
  try {
    const params = await context.params;
    const slug = params.slug;
    const org = await prisma.organization.findUnique({
      where: { slug },
      include: { members: { include: { user: true } } },
    });

    if (!org) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: org });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}

export const GET = withOrgRole(["ADMIN", "MANAGER", "VIEWER"], getOrgHandler as any);
