import { NextResponse } from "next/server";
import { withRole } from "@/shared/middleware/withRole";
import { withIdempotency } from "@/shared/middleware/withIdempotency";
import { scoreTestAttempt } from "@/features/test-engine/lib/scoring";
import { prisma } from "@/shared/lib/prisma";

async function submitTestHandler(req: Request, context: { params: { testId: string } }) {
  try {
    const params = await context.params;
    const body = await req.json();
    const { attemptId } = body;

    if (!attemptId) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    // Optional: verify that attemptId belongs to the current user
    const attempt = await prisma.testAttempt.findUnique({
      where: { id: attemptId },
    });

    if (!attempt || attempt.testId !== params.testId) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    const scoredAttempt = await scoreTestAttempt(attemptId);

    return NextResponse.json({ success: true, data: { score: scoredAttempt.score } });
  } catch (error: any) {
    console.error(error);
    if (error.message === "Attempt already submitted") {
      return NextResponse.json(
        { success: false, error: { code: "CONFLICT", message: error.message } },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}

export const POST = withIdempotency(withRole(["SUPER_ADMIN", "ADMIN", "USER"], submitTestHandler as any));
