"use client";

import * as React from "react";
import { QuestionCard } from "./QuestionCard";
import { TimerDisplay } from "./TimerDisplay";
import { Button } from "@/shared/components/ui/Button";

interface TestRunnerProps {
  test?: any;
  attemptId: string;
  initialTimeRemaining?: number;
  onComplete?: (resultId: string) => void;
}

export function TestRunner({ test = {}, attemptId, initialTimeRemaining = 1800, onComplete }: TestRunnerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = React.useState(initialTimeRemaining);
  const [submitting, setSubmitting] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

  React.useEffect(() => {
    if (isFinished) return;
    const timerId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isFinished]);

  const questions = test.questions || [];
  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // API call to submit answers
    try {
      const res = await fetch(`/api/v1/tests/${test.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attemptId, answers }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        setIsFinished(true);
        if (onComplete) onComplete(data.resultId ?? attemptId);
      } else {
        console.error("Submission failed");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAutoSubmit = () => {
    // Save reason "TIMER_EXPIRED"
    handleSubmit();
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <h2 className="text-3xl font-bold text-brand-primary">Test Completed!</h2>
        <p className="text-muted-foreground">Your responses have been recorded.</p>
        <Button onClick={() => window.location.href = '/dashboard'}>Return to Dashboard</Button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-surface p-4 rounded-lg border border-[var(--surface-elevated)] shadow-sm">
        <div>
          <h2 className="text-xl font-semibold">{test.title}</h2>
          <p className="text-sm text-muted-foreground">{test.category?.label}</p>
        </div>
        <TimerDisplay 
          timeRemainingSecs={timeRemaining} 
          totalDurationSecs={test.totalDurationSecs || 1800} 
        />
      </div>

      <QuestionCard 
        question={currentQuestion}
        currentNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedOptionId={answers[currentQuestion.id]}
        onSelectOption={handleSelectOption}
      />

      <div className="flex justify-between items-center mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={currentIndex === 0 || submitting}
        >
          Previous
        </Button>

        <div className="flex gap-4">
          {currentIndex === questions.length - 1 ? (
            <Button 
              variant="default" 
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={handleNext}
              disabled={submitting}
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
