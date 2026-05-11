import { prisma } from "@/shared/lib/prisma";

export async function convertGuestAttempts(fingerprint: string, newUserId: string) {
  // Find all guest attempts with the fingerprint that haven't been migrated
  const guestAttempts = await prisma.guestAttempt.findMany({
    where: {
      fingerprint,
      migratedToUserId: null,
    },
  });

  if (guestAttempts.length === 0) return 0;

  // Convert them to TestAttempts
  for (const guest of guestAttempts) {
    if (guest.completedAt) {
      // Calculate generic values or copy them over
      const answers = guest.answers as any || {};
      const score = guest.score || 0;
      
      await prisma.testAttempt.create({
        data: {
          userId: newUserId,
          testId: guest.testId,
          answers: answers,
          score,
          questionOrder: [], // order might not have been tracked for guests depending on implementation
          totalQuestions: Object.keys(answers).length,
          timeTakenSecs: 0,
          submittedAt: guest.completedAt,
          expiresAt: guest.completedAt,
        },
      });
    }

    // Mark as migrated
    await prisma.guestAttempt.update({
      where: { id: guest.id },
      data: { migratedToUserId: newUserId },
    });
  }

  return guestAttempts.length;
}
