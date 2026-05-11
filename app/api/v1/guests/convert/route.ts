import { NextResponse } from "next/server";
import { convertGuestAttempts } from "@/features/onboarding/lib/guest";
import { withRole } from "@/shared/middleware/withRole";
import { withIdempotency } from "@/shared/middleware/withIdempotency";

async function guestConvertHandler(req: Request) {
  try {
    const body = await req.json();
    const { fingerprint } = body;
    
    // We get the newUserId from the authenticated session
    const authReq = req as any;
    const newUserId = authReq.auth?.user?.id;

    if (!fingerprint || !newUserId) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const migratedCount = await convertGuestAttempts(fingerprint, newUserId);

    return NextResponse.json({ success: true, data: { migratedCount } });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}

// User must be authenticated to convert their guest attempts
export const POST = withIdempotency(withRole(["USER", "ADMIN", "SUPER_ADMIN"], guestConvertHandler as any));
