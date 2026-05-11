import { prisma } from "@/shared/lib/prisma";

export async function scoreTestAttempt(attemptId: string) {
  const attempt = await prisma.testAttempt.findUnique({
    where: { id: attemptId },
    include: { test: { include: { questions: true } } },
  });

  if (!attempt) throw new Error("Attempt not found");
  if (attempt.submittedAt) throw new Error("Attempt already submitted");

  const answers = attempt.answers as Record<string, string>;
  const questions = attempt.test.questions;

  let correctCount = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.correctOptionId) {
      correctCount++;
    }
  });

  const totalQuestions = questions.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  
  const timeTakenSecs = Math.round((new Date().getTime() - new Date(attempt.startedAt).getTime()) / 1000);

  const updatedAttempt = await prisma.testAttempt.update({
    where: { id: attemptId },
    data: {
      submittedAt: new Date(),
      score,
      correctCount,
      timeTakenSecs,
    },
  });

  return updatedAttempt;
}
