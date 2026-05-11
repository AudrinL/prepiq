"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TestRunner } from "@/features/test-engine/components/TestRunner";

export default function AttemptPage({ params }: { params: { category: string, testId: string } }) {
  const router = useRouter();
  const [attemptId, setAttemptId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, attemptId might be in URL search params or returned from an API
    // Here we read it from sessionStorage (stored in pre-test page)
    const stored = sessionStorage.getItem("current_attempt_id");
    if (stored) {
      setAttemptId(stored);
    } else {
      // Fallback
      setAttemptId("fallback-attempt-id");
    }
  }, []);

  const handleComplete = (resultId: string) => {
    // Navigate to results page
    router.replace(`/tests/${params.category}/${params.testId}/results/${resultId}`);
  };

  if (!attemptId) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  // We mount the TestRunner which already handles:
  // - Dual timer
  // - Violation guard
  // - Auto-save
  return (
    <div className="min-h-screen bg-background">
      <TestRunner 
        attemptId={attemptId}
        onComplete={handleComplete}
        // If accessed via org campaign, we would pass orgContext here:
        // orgContext={{ logoUrl: "...", primaryColor: "..." }}
      />
    </div>
  );
}
