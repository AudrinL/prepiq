import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { withRole } from "@/shared/middleware/withRole";
import { withRateLimit } from "@/shared/middleware/withRateLimit";
import { withIdempotency } from "@/shared/middleware/withIdempotency";

async function createOrgHandler(req: Request) {
  try {
    const body = await req.json();
    const { name, slug, email } = body;

    if (!name || !slug || !email) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Missing fields" } },
        { status: 400 }
      );
    }

    // Check if slug exists
    const existing = await prisma.organization.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: "CONFLICT", message: "Slug already exists" } },
        { status: 409 }
      );
    }

    const org = await prisma.organization.create({
      data: {
        name,
        slug,
        email,
        plan: "STARTER",
        seatsLimit: 50,
      },
    });

    return NextResponse.json({ success: true, data: org }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}

export const POST = withIdempotency(withRateLimit("auth", withRole(["SUPER_ADMIN", "ADMIN"], createOrgHandler as any)));
