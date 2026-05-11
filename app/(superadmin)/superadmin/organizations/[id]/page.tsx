"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { ArrowLeft, Building2, Users, Megaphone, CreditCard, Shield, Ban, CheckCircle2, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const org = {
  id: "1", name: "Acme Corporation", slug: "acme", plan: "ENTERPRISE", status: "ACTIVE",
  email: "admin@acme.com", createdAt: "2025-11-02", domain: "acme.prepiq.com",
  members: 45, campaigns: 12, totalTests: 3420,
  branding: { primaryColor: "#6366f1", logoUrl: null },
};

const usageData = [
  { month: "Jan", tests: 280 }, { month: "Feb", tests: 340 }, { month: "Mar", tests: 410 },
  { month: "Apr", tests: 520 }, { month: "May", tests: 480 }, { month: "Jun", tests: 620 },
];

const members = [
  { name: "John Admin", email: "john@acme.com", role: "ORG_ADMIN", joined: "2025-11-02" },
  { name: "Sarah Manager", email: "sarah@acme.com", role: "ORG_MANAGER", joined: "2025-12-10" },
  { name: "Mike Viewer", email: "mike@acme.com", role: "ORG_VIEWER", joined: "2026-01-15" },
];

export default function OrgDetailPage() {
  const [tab, setTab] = useState<"overview" | "members" | "billing">("overview");

  return (
    <div className="space-y-6">
      <Link href="/superadmin/organizations" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Organizations
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {org.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{org.name}</h1>
            <p className="text-sm text-muted-foreground">/{org.slug} &middot; {org.plan} &middot; Since {org.createdAt}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {org.status === "ACTIVE" ? (
            <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">
              <Ban className="h-4 w-4 mr-1" /> Suspend
            </Button>
          ) : (
            <Button variant="outline" className="text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1" /> Reactivate
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[var(--surface-elevated)]">
        {(["overview", "members", "billing"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-[hsl(var(--brand-hue),70%,50%)] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2"><Users className="h-4 w-4" /> Members</div>
              <div className="text-2xl font-bold">{org.members}</div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2"><Megaphone className="h-4 w-4" /> Campaigns</div>
              <div className="text-2xl font-bold">{org.campaigns}</div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-2 text-muted-foreground mb-2"><CreditCard className="h-4 w-4" /> Total Tests</div>
              <div className="text-2xl font-bold">{org.totalTests.toLocaleString()}</div>
            </Card>
          </div>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Test Usage (6 months)</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--surface-elevated)]" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="tests" fill="hsl(var(--brand-hue),70%,50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Details</h3>
            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
              <div><span className="text-muted-foreground">Contact:</span> {org.email}</div>
              <div><span className="text-muted-foreground">Domain:</span> {org.domain || "—"}</div>
              <div><span className="text-muted-foreground">Plan:</span> {org.plan}</div>
              <div><span className="text-muted-foreground">Status:</span> <span className="text-green-500">{org.status}</span></div>
            </div>
          </Card>
        </div>
      )}

      {tab === "members" && (
        <Card className="p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--surface-elevated)]">
                <th className="text-left py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.email} className="border-b border-[var(--surface-elevated)] last:border-0">
                  <td className="py-3 font-medium">{m.name}</td>
                  <td className="py-3 text-muted-foreground">{m.email}</td>
                  <td className="py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-elevated)]">{m.role}</span></td>
                  <td className="py-3 text-muted-foreground">{m.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === "billing" && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Billing Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Current Plan</span><span className="font-medium">{org.plan}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Monthly Revenue</span><span className="font-medium">$2,499/mo</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Payment Status</span><span className="text-green-500 font-medium">Current</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Next Invoice</span><span>Jun 1, 2026</span></div>
          </div>
        </Card>
      )}
    </div>
  );
}
