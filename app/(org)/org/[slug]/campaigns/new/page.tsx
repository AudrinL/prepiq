"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft, Calendar, FileText, Users } from "lucide-react";

export default function NewCampaignPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [emailsRaw, setEmailsRaw] = useState("");

  const availableTests = [
    { id: "test-1", title: "Numerical Reasoning - Intermediate", time: "30m" },
    { id: "test-2", title: "Verbal Reasoning - Intermediate", time: "20m" },
    { id: "test-3", title: "Abstract Reasoning - Advanced", time: "40m" },
    { id: "test-4", title: "Situational Judgment", time: "25m" }
  ];

  const handleToggleTest = (id: string) => {
    setSelectedTests(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to create campaign and invites
    setTimeout(() => {
      setLoading(false);
      router.push(`/org/${params.slug}/campaigns`);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-in fade-in duration-500">
      <div>
        <Link href={`/org/${params.slug}/campaigns`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Campaigns
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Create New Campaign</h1>
        <p className="text-muted-foreground">Set up your assessment, select tests, and invite candidates.</p>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[var(--surface-default)] -z-10"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300" style={{ width: `${(step - 1) * 50}%` }}></div>
        
        {[
          { num: 1, label: "Details", icon: FileText },
          { num: 2, label: "Tests", icon: CheckCircle2 },
          { num: 3, label: "Invites", icon: Users }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors duration-300 ${step >= s.num ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-[var(--surface-default)] border border-[var(--border)] text-muted-foreground'}`}>
              {step > s.num ? <CheckCircle2 size={20} /> : s.num}
            </div>
            <span className={`text-xs font-medium ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      <Card className="p-8 border-[var(--border)] shadow-lg">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h2 className="text-xl font-semibold mb-4 border-b border-[var(--border)] pb-2">Campaign Details</h2>
            
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Name *</label>
              <Input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="e.g., Q2 Engineering Graduate Intake" 
                required 
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Deadline / End Date *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <Input 
                  type="date" 
                  value={endDate} 
                  onChange={e => setEndDate(e.target.value)} 
                  className="pl-10"
                  required 
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">After this date, candidates will not be able to start tests.</p>
            </div>

            <div className="flex justify-end pt-4 border-t border-[var(--border)]">
              <Button onClick={() => name && endDate && setStep(2)} disabled={!name || !endDate} className="gap-2">
                Continue <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h2 className="text-xl font-semibold mb-4 border-b border-[var(--border)] pb-2">Select Assessment Tests</h2>
            
            <p className="text-sm text-muted-foreground">Select one or more tests for candidates to complete in this campaign.</p>

            <div className="space-y-3">
              {availableTests.map(test => (
                <label 
                  key={test.id} 
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedTests.includes(test.id) ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-[var(--border)] hover:border-primary/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-primary border-muted-foreground rounded focus:ring-primary"
                      checked={selectedTests.includes(test.id)}
                      onChange={() => handleToggleTest(test.id)}
                    />
                    <span className="font-medium">{test.title}</span>
                  </div>
                  <span className="text-sm text-muted-foreground bg-[var(--surface-default)] px-2 py-1 rounded">{test.time}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between pt-4 border-t border-[var(--border)]">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ChevronLeft size={18} /> Back
              </Button>
              <Button onClick={() => selectedTests.length > 0 && setStep(3)} disabled={selectedTests.length === 0} className="gap-2">
                Continue <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h2 className="text-xl font-semibold mb-4 border-b border-[var(--border)] pb-2">Invite Candidates</h2>
            
            <p className="text-sm text-muted-foreground">Paste candidate email addresses separated by commas or newlines. We will automatically send them a branded invitation link.</p>

            <div>
              <textarea 
                className="w-full min-h-[150px] p-4 bg-background border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                placeholder="candidate1@example.com&#10;candidate2@example.com"
                value={emailsRaw}
                onChange={e => setEmailsRaw(e.target.value)}
              ></textarea>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>{emailsRaw.split(/[\n,]+/).filter(e => e.trim()).length} candidates parsed</span>
                <span className="text-primary cursor-pointer hover:underline">Upload CSV instead</span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-4 rounded-lg text-sm">
              <strong className="block mb-1">Important:</strong> Ensure you have enough seats in your billing plan to invite these candidates. Unused invites cannot be refunded.
            </div>

            <div className="flex justify-between pt-4 border-t border-[var(--border)]">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ChevronLeft size={18} /> Back
              </Button>
              <Button onClick={handleSubmit} disabled={loading} className="gap-2">
                {loading ? "Creating..." : "Launch Campaign"} <CheckCircle2 size={18} />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
