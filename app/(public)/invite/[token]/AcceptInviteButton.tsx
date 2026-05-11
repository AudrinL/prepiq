"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

interface AcceptInviteButtonProps {
  token: string;
  orgColor: string;
}

export function AcceptInviteButton({ token, orgColor }: AcceptInviteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInitialClick = () => {
    // In a real implementation, we would check if the user is currently authenticated
    // For this demonstration, we'll assume they aren't and show the inline auth form
    setShowAuth(true);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Mocked login/signup for the invite
      const res = await fetch(`/api/v1/invites/${token}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        router.push(`/tests/${data.category}/${data.testId}/start`);
      } else {
        // If the endpoint doesn't exist yet, just mock the redirect
        router.push(`/tests/NUMERICAL/mock-test-1/start`);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  if (!showAuth) {
    return (
      <Button 
        size="lg" 
        className="w-full text-white" 
        style={{ backgroundColor: orgColor }}
        onClick={handleInitialClick}
      >
        Accept invitation & begin
      </Button>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-4">
      <h3 className="font-semibold text-center mb-4">Sign in or create account to continue</h3>
      <form onSubmit={handleAuthSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full mt-2 text-white" 
          style={{ backgroundColor: orgColor }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue to Assessment"}
        </Button>
      </form>
    </div>
  );
}
