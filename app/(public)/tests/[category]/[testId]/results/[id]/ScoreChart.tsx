"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ScoreChartProps {
  data: { name: string; value: number; color: string }[];
}

export function ScoreChart({ data }: ScoreChartProps) {
  // Filter out 0 values so they don't show on the chart
  const validData = data.filter(d => d.value > 0);

  if (validData.length === 0) {
    return <div className="text-muted-foreground">No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={validData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {validData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "var(--surface-elevated)",
            borderColor: "var(--border)",
            borderRadius: "0.5rem",
            color: "var(--foreground)"
          }}
          itemStyle={{ color: "var(--foreground)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
