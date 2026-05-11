"use client";

import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { CreditCard, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", mrr: 28400 }, { month: "Feb", mrr: 31200 }, { month: "Mar", mrr: 34800 },
  { month: "Apr", mrr: 38500 }, { month: "May", mrr: 42100 }, { month: "Jun", mrr: 45800 },
];

const planBreakdown = [
  { plan: "Enterprise", count: 18, revenue: "$29,700", pct: 65 },
  { plan: "Business", count: 42, revenue: "$10,920", pct: 24 },
  { plan: "Starter", count: 67, revenue: "$5,180", pct: 11 },
];

const recentTransactions = [
  { org: "HRBench Partners", amount: "+$2,499", type: "subscription", date: "May 7, 2026" },
  { org: "EduMetrics University", amount: "+$499", type: "subscription", date: "May 6, 2026" },
  { org: "TechHire Global", amount: "+$499", type: "upgrade", date: "May 5, 2026" },
  { org: "Acme Corporation", amount: "+$2,499", type: "subscription", date: "May 1, 2026" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Billing</h1>
          <p className="text-muted-foreground mt-1">Revenue metrics and transaction history.</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-1" /> Export Report</Button>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">MRR</span>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold">$45,800</div>
          <span className="text-xs text-green-500 inline-flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" /> +8.8% vs last month</span>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">ARR</span>
            <TrendingUp className="h-5 w-5 text-[hsl(var(--brand-hue),70%,50%)]" />
          </div>
          <div className="text-2xl font-bold">$549,600</div>
          <span className="text-xs text-muted-foreground">projected</span>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Churn Rate</span>
            <ArrowDownRight className="h-5 w-5 text-red-400" />
          </div>
          <div className="text-2xl font-bold">2.1%</div>
          <span className="text-xs text-green-500">down from 3.4%</span>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Paid Orgs</span>
            <CreditCard className="h-5 w-5 text-[hsl(210,70%,50%)]" />
          </div>
          <div className="text-2xl font-bold">127</div>
          <span className="text-xs text-muted-foreground">across 3 plans</span>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Monthly Recurring Revenue</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="fillRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(150,70%,40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(150,70%,40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--surface-elevated)]" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "MRR"]} />
              <Area type="monotone" dataKey="mrr" stroke="hsl(150,70%,40%)" fill="url(#fillRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Plan breakdown */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Revenue by Plan</h3>
          <div className="space-y-4">
            {planBreakdown.map(p => (
              <div key={p.plan}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.plan} <span className="text-muted-foreground">({p.count} orgs)</span></span>
                  <span className="font-medium">{p.revenue}/mo</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--surface-elevated)]">
                  <div className="h-full rounded-full bg-[hsl(var(--brand-hue),70%,50%)]" style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent transactions */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[var(--surface-elevated)] last:border-0">
                <div>
                  <div className="text-sm font-medium">{tx.org}</div>
                  <div className="text-xs text-muted-foreground">{tx.type} &middot; {tx.date}</div>
                </div>
                <span className="text-sm font-medium text-green-500">{tx.amount}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
