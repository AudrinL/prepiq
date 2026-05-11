"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";

interface BeginTestButtonProps {
  testId: string;
  category: string;
}

export function BeginTestButton({ testId, category }: BeginTestButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBegin = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Request Fullscreen
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen().catch(e => {
          console.warn("Fullscreen request failed, proceeding anyway:", e);
        });
      }

      // 2. Create Attempt
      // We assume /api/v1/attempts creates the attempt or guest attempt
      // If the API isn't ready or we are mocking, we can just navigate
      // but let's try the fetch and fallback
      
      let attemptId = "mock-attempt-123";
      try {
        const res = await fetch("/api/v1/attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ testId }),
        });
        
        if (res.ok) {
          const data = await res.json();
          attemptId = data.id;
        } else if (res.status === 401 || res.status === 403) {
          // If unauthorized, redirect to login
          router.push(`/auth/login?redirect=/tests/${category}/${testId}/start`);
          return;
        }
      } catch (e) {
        // Mock fallback if offline
      }

      // 3. Navigate to Attempt
      sessionStorage.setItem("current_attempt_id", attemptId);
      router.push(`/tests/${category}/${testId}/attempt`);
      
    } catch (err) {
      setError("Failed to start the test. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button 
        size="lg" 
        className="w-full h-16 text-xl font-bold rounded-xl" 
        onClick={handleBegin}
        disabled={loading}
      >
        {loading ? "Preparing Test..." : "Begin Test"}
      </Button>
    </div>
  );
}
