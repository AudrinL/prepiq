"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Card } from "@/shared/components/ui/Card";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

export default function OrgSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");

  // Step 2
  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [plan, setPlan] = useState("STARTER");

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!orgName || !orgEmail || !industry) {
        setError("Please fill in all required fields.");
        return;
      }
      setError(null);
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const slug = generateSlug(orgName);
      const res = await fetch("/api/v1/auth/org-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orgName, orgEmail, phone, industry, plan, adminName, password, slug 
        }),
      });
      
      if (res.ok) {
        router.push(`/org/${slug}?welcome=true`);
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--surface-subtle)] flex items-center justify-center py-12 px-4 sm:px-6">
      <Card className="w-full max-w-2xl p-8 md:p-12 shadow-2xl border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-500"></div>
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl tracking-tight text-primary">PrepIQ</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Register your organization</h1>
          <p className="text-muted-foreground mt-2">Start assessing candidates at scale today.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-[var(--surface-default)] text-muted-foreground'} font-bold`}>
            1
          </div>
          <div className={`w-16 h-1 flex-1 max-w-[100px] ${step >= 2 ? 'bg-primary' : 'bg-[var(--surface-default)]'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-[var(--surface-default)] text-muted-foreground'} font-bold`}>
            2
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg text-sm flex items-start gap-2">
            <CheckCircle2 size={16} className="mt-0.5 text-red-500" /> {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-6 animate-in slide-in-from-right-4">
            <h2 className="text-xl font-semibold mb-4 border-b border-[var(--border)] pb-2">Organization Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Organization Name *</label>
                <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Work Email *</label>
                <Input type="email" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry *</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-[var(--border)] bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" className="gap-2">
                Continue <ChevronRight size={18} />
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right-4">
            <h2 className="text-xl font-semibold mb-4 border-b border-[var(--border)] pb-2">Admin Account & Plan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Your Name *</label>
                <Input value={adminName} onChange={(e) => setAdminName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password *</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password *</label>
                <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Select Plan</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "STARTER", name: "Starter", price: "$0/mo" },
                  { id: "PRO", name: "Pro", price: "$49/mo" },
                  { id: "ENTERPRISE", name: "Enterprise", price: "Custom" }
                ].map(p => (
                  <div 
                    key={p.id}
                    onClick={() => setPlan(p.id)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${plan === p.id ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-[var(--border)] hover:border-primary/50'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{p.name}</span>
                      {plan === p.id && <CheckCircle2 size={16} className="text-primary" />}
                    </div>
                    <div className="text-lg font-bold">{p.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ChevronLeft size={18} /> Back
              </Button>
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "Creating Organization..." : "Complete Registration"}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
