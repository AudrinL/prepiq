"use client";

import * as React from "react";
import { getFingerprint } from "@/features/onboarding/lib/fingerprint";
import { Button } from "@/shared/components/ui/Button";

interface GuestConversionProps {
  onSuccess?: (migratedCount: number) => void;
}

export function GuestConversion({ onSuccess }: GuestConversionProps) {
  const [loading, setLoading] = React.useState(false);

  const handleSignupAndConvert = async () => {
    setLoading(true);
    try {
      const fingerprint = await getFingerprint();
      
      // In a real flow, you would redirect to NextAuth signin or show a signup modal here
      // For this example, we assume the user just signed in and we are converting
      
      const res = await fetch("/api/v1/guests/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fingerprint }),
      });

      if (res.ok) {
        const data = await res.json();
        if (onSuccess) onSuccess(data.data.migratedCount);
      } else {
        console.error("Failed to convert guest attempts");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-[var(--surface-elevated)] bg-surface p-6 text-center space-y-4">
      <h3 className="text-xl font-semibold">Save Your Progress</h3>
      <p className="text-muted-foreground text-sm">
        Create a free account to save your test results, track your progress over time, and unlock detailed analytics.
      </p>
      <Button onClick={handleSignupAndConvert} disabled={loading} className="w-full sm:w-auto">
        {loading ? "Processing..." : "Sign Up to Save Results"}
      </Button>
    </div>
  );
}
