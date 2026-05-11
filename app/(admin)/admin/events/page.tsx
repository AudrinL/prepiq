"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Activity, Search, Filter, Download, User, Shield, Settings, AlertTriangle, CheckCircle2 } from "lucide-react";

const mockEvents = [
  { id: "1", type: "test.completed", actor: "alice@example.com", detail: "Numerical Reasoning — Beginner (Score: 85%)", timestamp: "2026-05-07 19:20", severity: "info" },
  { id: "2", type: "user.signup", actor: "frank@edu.ac", detail: "Individual account created", timestamp: "2026-05-07 18:45", severity: "info" },
  { id: "3", type: "test.flagged", actor: "system", detail: "Anomalous completion time on T-003 by user-2891", timestamp: "2026-05-07 17:30", severity: "warning" },
  { id: "4", type: "question.imported", actor: "admin@prepiq.com", detail: "42 questions added to Numerical category", timestamp: "2026-05-07 15:00", severity: "info" },
  { id: "5", type: "campaign.created", actor: "eve@techhire.com", detail: "Q2 Graduate Assessment — TechHire Global", timestamp: "2026-05-07 14:20", severity: "info" },
  { id: "6", type: "rate_limit.triggered", actor: "system", detail: "IP 45.33.21.8 exceeded 100 req/min on /api/v1/tests", timestamp: "2026-05-07 12:10", severity: "error" },
  { id: "7", type: "test.published", actor: "admin@prepiq.com", detail: "Verbal Reasoning — Advanced Level 3", timestamp: "2026-05-07 10:00", severity: "info" },
  { id: "8", type: "user.banned", actor: "support@prepiq.com", detail: "user-4521 banned for TOS violation", timestamp: "2026-05-06 22:30", severity: "warning" },
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = mockEvents.filter(evt => {
    const matchSearch = evt.type.includes(search.toLowerCase()) || evt.actor.includes(search.toLowerCase()) || evt.detail.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === "all" || evt.severity === severityFilter;
    return matchSearch && matchSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Events</h1>
          <p className="text-muted-foreground mt-1">Real-time event stream and activity log.</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-1" /> Export</Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {["all", "info", "warning", "error"].map(s => (
              <button key={s} onClick={() => setSeverityFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${severityFilter === s ? "bg-[hsl(var(--brand-hue),70%,50%)] text-white" : "bg-[var(--surface-elevated)] text-muted-foreground"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          {filtered.map(evt => (
            <div key={evt.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors">
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${evt.severity === "error" ? "bg-red-100 dark:bg-red-900/30 text-red-500" : evt.severity === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600" : "bg-[var(--surface-elevated)] text-muted-foreground"}`}>
                {evt.severity === "error" ? <AlertTriangle className="h-4 w-4" /> : evt.severity === "warning" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-sm font-medium">{evt.type}</code>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase ${evt.severity === "error" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : evt.severity === "warning" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                    {evt.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{evt.detail}</p>
                <p className="text-xs text-muted-foreground">by {evt.actor}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">{evt.timestamp}</span>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">No events found.</div>}
      </Card>
    </div>
  );
}
