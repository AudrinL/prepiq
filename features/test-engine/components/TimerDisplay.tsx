"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface TimerDisplayProps {
  timeRemainingSecs: number;
  totalDurationSecs: number;
  onExpire?: () => void;
}

export function TimerDisplay({ timeRemainingSecs, totalDurationSecs, onExpire }: TimerDisplayProps) {
  React.useEffect(() => {
    if (timeRemainingSecs <= 0 && onExpire) {
      onExpire();
    }
  }, [timeRemainingSecs, onExpire]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isLow = timeRemainingSecs < totalDurationSecs * 0.1; // last 10%

  return (
    <div className={cn(
      "font-mono text-xl font-bold p-3 rounded-md flex items-center justify-center transition-colors",
      isLow ? "bg-red-500/10 text-red-500 animate-pulse" : "bg-surface-elevated text-foreground"
    )}>
      {formatTime(Math.max(0, timeRemainingSecs))}
    </div>
  );
}
