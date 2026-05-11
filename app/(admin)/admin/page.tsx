"use client";

import { Card } from "@/shared/components/ui/Card";
import { Users, FileQuestion, ClipboardList, Activity, TrendingUp, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Users", value: "14,892", change: "+342 this week", icon: Users, color: "hsl(var(--brand-hue),70%,50%)" },
  { label: "Question Bank", value: "8,241", change: "across 6 categories", icon: FileQuestion, color: "hsl(210,70%,50%)" },
  { label: "Active Tests", value: "124", change: "18 drafts", icon: ClipboardList, color: "hsl(150,70%,40%)" },
  { label: "Reports Pending", value: "7", change: "3 flagged", icon: AlertCircle, color: "hsl(45,90%,50%)" },
];

const activityData = [
  { day: "Mon", signups: 42, tests: 320 }, { day: "Tue", signups: 55, tests: 410 },
  { day: "Wed", signups: 38, tests: 380 }, { day: "Thu", signups: 61, tests: 450 },
  { day: "Fri", signups: 48, tests: 390 }, { day: "Sat", signups: 25, tests: 210 },
  { day: "Sun", signups: 18, tests: 160 },
];

const recentActivity = [
  { action: "New question batch imported", detail: "42 numerical reasoning questions", time: "15 min ago" },
  { action: "Test published", detail: "Verbal Reasoning — Advanced Level 3", time: "1h ago" },
  { action: "User report flagged", detail: "Inappropriate content in SJT #412", time: "2h ago" },
  { action: "Bulk user import", detail: "EduMetrics University — 120 users", time: "4h ago" },
  { action: "Question retired", detail: "Abstract Q-1847 (low discrimination)", time: "6h ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Admin</h1>
        <p className="text-muted-foreground mt-1">Manage questions, tests, users, and platform content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-5 w-5" style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <span className="text-xs text-muted-foreground">{s.change}</span>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[hsl(var(--brand-hue),70%,50%)]" /> Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--surface-elevated)]" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="tests" stroke="hsl(var(--brand-hue),70%,50%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="signups" stroke="hsl(210,70%,50%)" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Activity className="h-4 w-4" /> Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="border-b border-[var(--surface-elevated)] last:border-0 pb-3 last:pb-0">
                <p className="text-sm font-medium">{a.action}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
