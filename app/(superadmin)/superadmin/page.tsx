"use client";

import { Card } from "@/shared/components/ui/Card";
import { Building2, Users, Activity, AlertTriangle, TrendingUp, Server } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stats = [
  { label: "Total Organizations", value: "127", change: "+8", icon: Building2, color: "hsl(var(--brand-hue),70%,50%)" },
  { label: "Active Users", value: "14,892", change: "+342", icon: Users, color: "hsl(210,70%,50%)" },
  { label: "Tests Today", value: "2,431", change: "+18%", icon: Activity, color: "hsl(150,70%,40%)" },
  { label: "Incidents", value: "0", change: "—", icon: AlertTriangle, color: "hsl(45,90%,50%)" },
];

const trafficData = [
  { day: "Mon", tests: 1820, users: 890 },
  { day: "Tue", tests: 2100, users: 1020 },
  { day: "Wed", tests: 1950, users: 960 },
  { day: "Thu", tests: 2431, users: 1150 },
  { day: "Fri", tests: 2200, users: 1080 },
  { day: "Sat", tests: 1400, users: 620 },
  { day: "Sun", tests: 1100, users: 480 },
];

const orgGrowth = [
  { month: "Jan", orgs: 89 }, { month: "Feb", orgs: 95 }, { month: "Mar", orgs: 102 },
  { month: "Apr", orgs: 110 }, { month: "May", orgs: 119 }, { month: "Jun", orgs: 127 },
];

const recentEvents = [
  { type: "org_created", message: "Acme Corp registered", time: "12 min ago" },
  { type: "plan_upgrade", message: "TechHire upgraded to Enterprise", time: "1h ago" },
  { type: "alert", message: "Rate limit spike on /api/v1/tests", time: "2h ago" },
  { type: "org_created", message: "GlobalAssess Inc registered", time: "4h ago" },
  { type: "suspension", message: "TestFraud Ltd suspended (TOS violation)", time: "6h ago" },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground mt-1">System health and key metrics at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-5 w-5" style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <span className="text-xs text-muted-foreground">{s.change} this week</span>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[hsl(var(--brand-hue),70%,50%)]" /> Platform Traffic (7d)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="fillTests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--brand-hue),70%,50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--brand-hue),70%,50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--surface-elevated)]" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="tests" stroke="hsl(var(--brand-hue),70%,50%)" fill="url(#fillTests)" />
                <Area type="monotone" dataKey="users" stroke="hsl(210,70%,50%)" fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[hsl(210,70%,50%)]" /> Org Growth (6mo)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orgGrowth}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--surface-elevated)]" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="orgs" fill="hsl(var(--brand-hue),70%,50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* System + Events */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Server className="h-4 w-4" /> System Health
          </h3>
          <div className="space-y-4">
            {[
              { name: "API Response Time", value: "142ms", status: "healthy" },
              { name: "Database Connections", value: "23/100", status: "healthy" },
              { name: "Redis Memory", value: "456MB / 2GB", status: "healthy" },
              { name: "Queue Depth", value: "12 jobs", status: "healthy" },
              { name: "Error Rate (1h)", value: "0.02%", status: "healthy" },
            ].map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Events</h3>
          <div className="space-y-4">
            {recentEvents.map((evt, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${evt.type === "alert" || evt.type === "suspension" ? "bg-red-500" : "bg-green-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{evt.message}</p>
                  <p className="text-xs text-muted-foreground">{evt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
