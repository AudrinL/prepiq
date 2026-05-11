"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";

export function FreeTestBanner() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem("prepiq_guest");
      if (data) {
        const parsed = JSON.parse(data);
        const attempts = Array.isArray(parsed) ? parsed.length : 0;
        setRemaining(Math.max(0, 3 - attempts));
      } else {
        setRemaining(3);
      }
    } catch (e) {
      setRemaining(3);
    }
  }, []);

  if (remaining === null) return null;

  if (remaining === 0) {
    return (
      <div className="bg-primary/10 border border-primary/20 text-primary px-6 py-4 rounded-xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Info size={20} />
          <span className="font-medium">You&apos;ve used all 3 free tests.</span>
        </div>
        <Link href="/auth/signup" className="font-bold hover:underline">
          Sign up to unlock unlimited tests →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-primary/10 border border-primary/20 text-primary px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
      <Info size={20} />
      <span className="font-medium">
        Try 3 tests free — no account needed. {remaining} of 3 remaining.
      </span>
    </div>
  );
}
