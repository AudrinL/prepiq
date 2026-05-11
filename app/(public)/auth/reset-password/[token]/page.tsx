"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card } from "@/shared/components/ui/Card";
import { Lock, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const valid = password.length >= 8 && password === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        {done ? (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Password Reset</h1>
            <p className="text-muted-foreground mb-6">Your password has been successfully reset. You can now sign in.</p>
            <Link href="/auth/login"><Button className="w-full py-3">Sign In</Button></Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-[hsl(var(--brand-hue),70%,93%)] dark:bg-[hsl(var(--brand-hue),50%,15%)] flex items-center justify-center mb-6">
                <Lock className="h-8 w-8 text-[hsl(var(--brand-hue),70%,50%)]" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
              <p className="text-muted-foreground text-sm">Enter your new password below.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5">New Password</label>
                <div className="relative">
                  <Input id="password" type={showPw ? "text" : "password"} required minLength={8} placeholder="Min 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirm" className="block text-sm font-medium mb-1.5">Confirm Password</label>
                <Input id="confirm" type="password" required placeholder="Repeat password" value={confirm} onChange={e => setConfirm(e.target.value)} />
                {confirm && password !== confirm && <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>}
              </div>
              <Button type="submit" className="w-full py-3" disabled={!valid || loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
