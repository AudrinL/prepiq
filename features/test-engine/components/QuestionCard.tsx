"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/utils";

interface QuestionCardProps {
  question: any;
  currentNumber: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export function QuestionCard({
  question,
  currentNumber,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
}: QuestionCardProps) {
  // Ensure options is parsed if it's a string from JSON
  const options = typeof question.options === 'string' ? JSON.parse(question.options) : question.options;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
          <span>Question {currentNumber} of {totalQuestions}</span>
        </div>
        <CardTitle className="text-xl leading-relaxed">
          {question.text}
        </CardTitle>
        {question.imageUrl && (
          <div className="mt-4 flex justify-center">
            <img src={question.imageUrl} alt="Question figure" className="max-h-64 rounded-md object-contain" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {options?.map((option: any) => (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={cn(
                "flex items-center w-full p-4 rounded-lg border text-left transition-colors",
                selectedOptionId === option.id 
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-[var(--surface-elevated)] hover:border-brand-primary/50 hover:bg-accent"
              )}
            >
              <span className="font-semibold mr-4 text-lg">{option.id}</span>
              <span className="flex-1">{option.text}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
