"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card } from "@/shared/components/ui/Card";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        {submitted ? (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Check Your Email</h1>
            <p className="text-muted-foreground mb-6">
              If an account exists for <span className="font-medium text-foreground">{email}</span>,
              we&apos;ve sent password reset instructions.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Didn&apos;t receive it? Check your spam folder or try again in a few minutes.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="outline" onClick={() => setSubmitted(false)} className="w-full">
                Try Another Email
              </Button>
              <Link href="/auth/login" className="w-full">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(var(--brand-hue),70%,93%)] dark:bg-[hsl(var(--brand-hue),50%,15%)] flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-[hsl(var(--brand-hue),70%,50%)]" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
              <p className="text-muted-foreground text-sm">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full py-3" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/auth/login" className="text-sm text-[hsl(var(--brand-hue),70%,50%)] hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to Sign In
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
