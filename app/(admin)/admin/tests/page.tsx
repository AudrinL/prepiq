"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Search, Plus, Edit, Eye, Copy, ClipboardList, Clock, FileQuestion } from "lucide-react";

const mockTests = [
  { id: "T-001", name: "Numerical Reasoning — Beginner", category: "Numerical", difficulty: "Beginner", questions: 25, timeLimit: 30, status: "Published", attempts: 3420 },
  { id: "T-002", name: "Verbal Reasoning — Intermediate", category: "Verbal", difficulty: "Intermediate", questions: 30, timeLimit: 35, status: "Published", attempts: 2890 },
  { id: "T-003", name: "Abstract Reasoning — Advanced", category: "Abstract", difficulty: "Advanced", questions: 20, timeLimit: 25, status: "Published", attempts: 1560 },
  { id: "T-004", name: "SJT — Workplace Scenarios", category: "SJT", difficulty: "Intermediate", questions: 15, timeLimit: 20, status: "Published", attempts: 2100 },
  { id: "T-005", name: "Personality Assessment — Standard", category: "Personality", difficulty: "Beginner", questions: 40, timeLimit: 0, status: "Published", attempts: 1800 },
  { id: "T-006", name: "EQ Assessment — Draft", category: "EQ", difficulty: "Beginner", questions: 12, timeLimit: 15, status: "Draft", attempts: 0 },
  { id: "T-007", name: "Numerical Reasoning — Advanced L3", category: "Numerical", difficulty: "Advanced", questions: 30, timeLimit: 40, status: "Draft", attempts: 0 },
];

export default function TestsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockTests.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Management</h1>
          <p className="text-muted-foreground mt-1">Create and manage psychometric tests.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-1" /> Create Test</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2"><ClipboardList className="h-4 w-4" /> Total Tests</div>
          <div className="text-2xl font-bold">{mockTests.length}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2"><FileQuestion className="h-4 w-4" /> Total Questions</div>
          <div className="text-2xl font-bold">{mockTests.reduce((s, t) => s + t.questions, 0)}</div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2"><Clock className="h-4 w-4" /> Total Attempts</div>
          <div className="text-2xl font-bold">{mockTests.reduce((s, t) => s + t.attempts, 0).toLocaleString()}</div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tests..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {["All", "Published", "Draft"].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${statusFilter === s ? "bg-[hsl(var(--brand-hue),70%,50%)] text-white" : "bg-[var(--surface-elevated)] text-muted-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--surface-elevated)]">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Test</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Level</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Qs</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Time</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Attempts</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(test => (
                <tr key={test.id} className="border-b border-[var(--surface-elevated)] last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-medium">{test.name}</div>
                    <div className="text-xs text-muted-foreground">{test.id}</div>
                  </td>
                  <td className="py-3 px-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-elevated)]">{test.category}</span></td>
                  <td className="py-3 px-3 text-muted-foreground">{test.difficulty}</td>
                  <td className="py-3 px-3 text-center">{test.questions}</td>
                  <td className="py-3 px-3 text-center text-muted-foreground">{test.timeLimit ? `${test.timeLimit}m` : "—"}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs ${test.status === "Published" ? "text-green-500" : "text-yellow-500"}`}>{test.status}</span>
                  </td>
                  <td className="py-3 px-3 text-center">{test.attempts.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Copy className="h-4 w-4" /></Button>
                    </div>
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
