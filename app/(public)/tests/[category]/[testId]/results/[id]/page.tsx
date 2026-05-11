import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/shared/lib/db";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { ScoreChart } from "./ScoreChart";
import { CheckCircle2, XCircle, MinusCircle, ArrowRight, Share2, Award } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Test Results - PrepIQ",
  };
}

export default async function ResultsPage({ params }: { params: { category: string, testId: string, id: string } }) {
  let attempt = null;
  
  try {
    attempt = await db.testAttempt.findUnique({
      where: { id: params.id },
      include: {
        test: { include: { category: true, questions: true } }
      }
    });
  } catch (e) {
    // Mock if DB not connected
    attempt = {
      id: params.id,
      score: 84,
      correctCount: 21,
      totalQuestions: 25,
      timeTakenSecs: 1450,
      test: {
        title: "Sample Mock Test",
        category: { label: "Sample Category" },
        questions: []
      },
      answers: {},
      questionOrder: []
    };
  }

  if (!attempt) {
    notFound();
  }

  // Calculate stats
  const total = attempt.totalQuestions;
  const correct = attempt.correctCount || 0;
  const answered = Object.keys(attempt.answers as object || {}).length;
  const skipped = total - answered;
  const incorrect = answered - correct;
  
  const score = attempt.score || Math.round((correct / total) * 100);
  const isPass = score >= 70; // Assumed passing score

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Results</h1>
          <p className="text-muted-foreground">{attempt.test?.title} • {attempt.test?.category?.label}</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Share2 size={16} /> Share Result
          </Button>
          <Link href="/dashboard">
            <Button className="gap-2">
              Dashboard <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Score Hero */}
        <Card className="p-8 lg:col-span-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-primary to-indigo-500"></div>
          <h2 className="text-lg font-semibold mb-6">Overall Score</h2>
          
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--surface-default)" strokeWidth="10" />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke={isPass ? "#10B981" : "#EF4444"} 
                strokeWidth="10"
                strokeDasharray={`${score * 2.83} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold tracking-tighter">{score}%</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${isPass ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
            {isPass ? <Award size={20} /> : <XCircle size={20} />}
            {isPass ? "Passed" : "Needs Improvement"}
          </div>
        </Card>

        {/* Breakdown */}
        <Card className="p-8 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6">Performance Breakdown</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-medium">Correct</span>
                </div>
                <span className="text-2xl font-bold">{correct}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                    <XCircle size={20} />
                  </div>
                  <span className="font-medium">Incorrect</span>
                </div>
                <span className="text-2xl font-bold">{incorrect}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-500/20 text-slate-500 flex items-center justify-center">
                    <MinusCircle size={20} />
                  </div>
                  <span className="font-medium">Skipped</span>
                </div>
                <span className="text-2xl font-bold">{skipped}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center h-[240px]">
              <ScoreChart data={[
                { name: 'Correct', value: correct, color: '#10B981' },
                { name: 'Incorrect', value: incorrect, color: '#EF4444' },
                { name: 'Skipped', value: skipped, color: '#64748B' }
              ]} />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Link href={`/tests/${params.category}`}>
          <Button variant="outline" size="lg">Practice Again</Button>
        </Link>
      </div>
    </div>
  );
}
