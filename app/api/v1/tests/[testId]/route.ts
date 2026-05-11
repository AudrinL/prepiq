import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { withRole } from "@/shared/middleware/withRole";

async function getTestHandler(req: Request, context: { params: { testId: string } }) {
  try {
    const params = await context.params;
    const testId = params.testId;

    const test = await prisma.test.findUnique({
      where: { id: testId, isActive: true },
      include: {
        category: true,
        questions: {
          select: {
            id: true,
            text: true,
            options: true,
            imageUrl: true,
          }, // Only safe fields, no correctOptionId
        },
      },
    });

    if (!test) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: test });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}

// Open to all authenticated users (tests are usually gated by attempt creation, but getting generic test info is fine)
export const GET = withRole(["SUPER_ADMIN", "ADMIN", "USER"], getTestHandler as any);
