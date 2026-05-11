"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { FileBarChart, Download, Eye, Clock, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const categoryStats = [
  { name: "Numerical", avgScore: 72, attempts: 3420 },
  { name: "Verbal", avgScore: 68, attempts: 2890 },
  { name: "Abstract", avgScore: 61, attempts: 1560 },
  { name: "SJT", avgScore: 74, attempts: 2100 },
  { name: "Personality", avgScore: 0, attempts: 1800 },
  { name: "EQ", avgScore: 69, attempts: 450 },
];

const flaggedReports = [
  { id: "R-001", type: "Content Issue", detail: "Question Q-412 reported as culturally biased", reporter: "carol@acme.com", date: "May 7, 2026", status: "Open" },
  { id: "R-002", type: "Cheating Suspected", detail: "User completed Advanced test in 3 minutes", reporter: "system", date: "May 7, 2026", status: "Under Review" },
  { id: "R-003", type: "Bug Report", detail: "Timer freezes on mobile Safari during SJT", reporter: "bob@example.com", date: "May 6, 2026", status: "Open" },
  { id: "R-004", type: "Content Issue", detail: "Typo in Verbal Q-234 answer option C", reporter: "alice@example.com", date: "May 5, 2026", status: "Resolved" },
];

const generatedReports = [
  { name: "Monthly Platform Summary — April 2026", type: "Platform", date: "May 1, 2026", size: "2.4 MB" },
  { name: "Adverse Impact Analysis — Q1 2026", type: "Compliance", date: "Apr 15, 2026", size: "1.8 MB" },
  { name: "Test Reliability Report — Numerical", type: "Psychometric", date: "Apr 10, 2026", size: "980 KB" },
];

export default function ReportsPage() {
  const [tab, setTab] = useState<"analytics" | "flagged" | "generated">("analytics");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">Platform analytics, flagged content, and generated reports.</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-1" /> Export All</Button>
      </div>

      <div className="flex gap-1 border-b border-[var(--surface-elevated)]">
        {(["analytics", "flagged", "generated"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-[hsl(var(--brand-hue),70%,50%)] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "analytics" && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Average Score by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats.filter(c => c.avgScore > 0)}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--surface-elevated)]" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="hsl(var(--brand-hue),70%,50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map(cat => (
              <Card key={cat.name} className="p-5">
                <h4 className="font-medium text-sm mb-2">{cat.name}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Score</span>
                  <span className="font-medium">{cat.avgScore > 0 ? `${cat.avgScore}%` : "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Attempts</span>
                  <span>{cat.attempts.toLocaleString()}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "flagged" && (
        <Card className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--surface-elevated)]">
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Detail</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Reporter</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-3 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {flaggedReports.map(r => (
                  <tr key={r.id} className="border-b border-[var(--surface-elevated)] last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                    <td className="py-3 px-3 font-mono text-xs">{r.id}</td>
                    <td className="py-3 px-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-elevated)]">{r.type}</span></td>
                    <td className="py-3 px-3 max-w-xs truncate">{r.detail}</td>
                    <td className="py-3 px-3 text-muted-foreground">{r.reporter}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs inline-flex items-center gap-1 ${r.status === "Resolved" ? "text-green-500" : r.status === "Under Review" ? "text-yellow-500" : "text-red-500"}`}>
                        {r.status === "Resolved" ? <CheckCircle2 className="h-3 w-3" /> : r.status === "Under Review" ? <Clock className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right"><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "generated" && (
        <Card className="p-4">
          <div className="space-y-3">
            {generatedReports.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-[var(--surface-elevated)] hover:bg-[var(--surface-elevated)] transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-[hsl(var(--brand-hue),70%,50%)]" />
                  <div>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.type} &middot; {r.date} &middot; {r.size}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Download</Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
