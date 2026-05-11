"use client";

import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export default function ProgressPage() {
  const history = [
    { id: "1", test: "Numerical Reasoning", category: "NUMERICAL", level: "Advanced", score: 84, time: "22m 15s", date: "2025-03-29" },
    { id: "2", test: "Verbal Reasoning", category: "VERBAL", level: "Intermediate", score: 72, time: "18m 30s", date: "2025-03-28" },
    { id: "3", test: "Abstract Reasoning", category: "ABSTRACT", level: "Intermediate", score: 65, time: "25m 00s", date: "2025-03-25" },
    { id: "4", test: "Situational Judgment", category: "SITUATIONAL", level: "Beginner", score: 90, time: "30m 10s", date: "2025-03-20" },
    { id: "5", test: "Numerical Practice", category: "NUMERICAL", level: "Beginner", score: 76, time: "24m 45s", date: "2025-03-15" },
    { id: "6", test: "Abstract Basics", category: "ABSTRACT", level: "Beginner", score: 55, time: "28m 20s", date: "2025-03-10" },
  ];

  const improvementData = [
    { date: "Mar 1", NUMERICAL: 60, VERBAL: 65, ABSTRACT: 55 },
    { date: "Mar 8", NUMERICAL: 65, VERBAL: 68, ABSTRACT: 60 },
    { date: "Mar 15", NUMERICAL: 76, VERBAL: 70, ABSTRACT: 62 },
    { date: "Mar 22", NUMERICAL: 78, VERBAL: 71, ABSTRACT: 65 },
    { date: "Mar 29", NUMERICAL: 84, VERBAL: 72, ABSTRACT: 65 },
  ];

  const weakTopics = [
    { topic: "Data Interpretation", score: 42, color: "bg-red-500" },
    { topic: "Pattern Recognition", score: 55, color: "bg-amber-500" },
    { topic: "Critical Reasoning", score: 62, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Progress</h1>
        <p className="text-muted-foreground">Track your test history and identify areas for improvement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Improvement Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Score Improvement</h3>
            <select className="bg-[var(--surface-subtle)] border border-[var(--border)] rounded-md text-sm px-2 py-1">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={improvementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "0.5rem" }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Line type="monotone" dataKey="NUMERICAL" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="VERBAL" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="ABSTRACT" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Insights Panel */}
        <div className="space-y-8">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-amber-500" /> Your weak topics
            </h3>
            <div className="space-y-4">
              {weakTopics.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{item.topic}</span>
                    <span className="text-muted-foreground">{item.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--surface-default)] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-sm">Practice weak topics</Button>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-indigo-500/10 border-primary/20">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-primary">
              <TrendingUp size={20} /> Improvement Rate
            </h3>
            <p className="text-sm text-muted-foreground mb-4">You&apos;ve improved significantly since your first attempt!</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-primary">+24%</span>
              <span className="text-sm text-muted-foreground pb-1">in Numerical</span>
            </div>
          </Card>
        </div>
      </div>

      {/* History Table */}
      <Card className="overflow-hidden border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="font-semibold text-lg">Attempt History</h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Filter by category..." 
              className="bg-[var(--surface-subtle)] border border-[var(--border)] rounded-md px-3 py-1.5 text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-[var(--surface-subtle)]">
              <tr>
                <th className="px-6 py-4 font-medium">Test Name</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 font-medium">Score</th>
                <th className="px-6 py-4 font-medium">Time Taken</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {history.map((row) => (
                <tr key={row.id} className="bg-background hover:bg-[var(--surface-subtle)] transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    {row.test}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{row.level}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.score >= 80 ? 'bg-emerald-500/10 text-emerald-500' : row.score >= 60 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                      {row.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{row.time}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/tests/${row.category}/testId/results/${row.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">Review</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
