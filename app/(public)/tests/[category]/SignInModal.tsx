"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { X } from "lucide-react";

interface SignInModalProps {
  testId: string;
  category: string;
}

export function SignInModal({ testId, category }: SignInModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [remaining, setRemaining] = useState<number>(3);

  useEffect(() => {
    try {
      const data = localStorage.getItem("prepiq_guest");
      if (data) {
        const parsed = JSON.parse(data);
        const attempts = Array.isArray(parsed) ? parsed.length : 0;
        setRemaining(Math.max(0, 3 - attempts));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleStart = () => {
    if (remaining > 0) {
      router.push(`/tests/${category}/${testId}/start`);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Button onClick={handleStart} className="w-full">
        Start Test
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background border border-[var(--surface-elevated)] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-[var(--surface-subtle)] transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-2">You&apos;ve used your 3 free tests</h2>
              <p className="text-center text-muted-foreground mb-8">
                Sign up for a free account to track your progress and unlock more practice tests.
              </p>

              <div className="space-y-3">
                <Link href="/auth/signup" className="block w-full">
                  <Button className="w-full" size="lg" onClick={() => setIsOpen(false)}>
                    Create free account
                  </Button>
                </Link>
                <Link href={`/auth/login?redirect=/tests/${category}/${testId}/start`} className="block w-full">
                  <Button variant="outline" className="w-full" size="lg" onClick={() => setIsOpen(false)}>
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
