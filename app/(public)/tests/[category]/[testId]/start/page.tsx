import { notFound } from "next/navigation";
import { db } from "@/shared/lib/db";
import { BeginTestButton } from "./BeginTestButton";
import { Clock, HelpCircle, AlertTriangle, ShieldCheck, Monitor, CheckCircle2 } from "lucide-react";

export async function generateMetadata({ params }: { params: { testId: string } }) {
  return {
    title: "Start Test - PrepIQ",
  };
}

export default async function PreTestPage({ params }: { params: { category: string, testId: string } }) {
  let test = null;
  
  try {
    test = await db.test.findUnique({
      where: { id: params.testId },
      include: {
        category: true,
        _count: { select: { questions: true } }
      }
    });
  } catch (e) {
    // Mock if DB not connected
    test = {
      id: params.testId,
      title: "Sample Mock Test",
      level: "INTERMEDIATE",
      totalDurationSecs: 1800,
      minQuestions: 25,
      _count: { questions: 25 },
      category: { label: "Sample Category" }
    };
  }

  if (!test) {
    notFound();
  }

  const questionCount = test._count?.questions || test.minQuestions;
  const durationMins = Math.round(test.totalDurationSecs / 60);

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="p-8 md:p-12 border-b border-[var(--border)] bg-[var(--surface-subtle)]">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            {test.category?.label || "Category"}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{test.title}</h1>
          
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[var(--surface-default)] flex items-center justify-center">
                <HelpCircle size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-semibold">{questionCount}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[var(--surface-default)] flex items-center justify-center">
                <Clock size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Limit</p>
                <p className="font-semibold">{durationMins} Minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[var(--surface-default)] flex items-center justify-center">
                <ShieldCheck size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="font-semibold capitalize">{test.level.toLowerCase()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Test Instructions & Rules</h2>
          
          <div className="space-y-6 mb-10">
            <div className="flex gap-4">
              <div className="mt-1">
                <Monitor className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fullscreen Mode Required</h3>
                <p className="text-muted-foreground">The test will automatically open in fullscreen. Exiting fullscreen will count as a violation.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1">
                <AlertTriangle className="text-amber-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">No Tab Switching</h3>
                <p className="text-muted-foreground">Navigating away from the test tab will result in a warning. Your test will be auto-submitted after 3 violations.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1">
                <Clock className="text-indigo-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dual Timers</h3>
                <p className="text-muted-foreground">You are bound by an overall test timer and a per-question timer. If the per-question timer runs out, it auto-advances.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1">
                <CheckCircle2 className="text-emerald-500" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Auto-saving</h3>
                <p className="text-muted-foreground">Your answers are automatically saved. If you get disconnected, you can resume exactly where you left off.</p>
              </div>
            </div>
          </div>

          <BeginTestButton testId={test.id} category={params.category} />
        </div>
      </div>
    </div>
  );
}
