"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Building2, Search, MoreHorizontal, CheckCircle2, XCircle, Clock, ExternalLink } from "lucide-react";

type OrgStatus = "ACTIVE" | "SUSPENDED" | "PENDING";

const mockOrgs = [
  { id: "1", name: "Acme Corporation", slug: "acme", plan: "ENTERPRISE", status: "ACTIVE" as OrgStatus, members: 45, campaigns: 12, createdAt: "2025-11-02" },
  { id: "2", name: "TechHire Global", slug: "techhire", plan: "BUSINESS", status: "ACTIVE" as OrgStatus, members: 23, campaigns: 8, createdAt: "2025-12-15" },
  { id: "3", name: "GlobalAssess Inc", slug: "globalassess", plan: "STARTER", status: "PENDING" as OrgStatus, members: 3, campaigns: 0, createdAt: "2026-04-28" },
  { id: "4", name: "TestFraud Ltd", slug: "testfraud", plan: "STARTER", status: "SUSPENDED" as OrgStatus, members: 2, campaigns: 1, createdAt: "2026-01-10" },
  { id: "5", name: "EduMetrics University", slug: "edumetrics", plan: "BUSINESS", status: "ACTIVE" as OrgStatus, members: 15, campaigns: 6, createdAt: "2025-09-20" },
  { id: "6", name: "HRBench Partners", slug: "hrbench", plan: "ENTERPRISE", status: "ACTIVE" as OrgStatus, members: 67, campaigns: 24, createdAt: "2025-06-01" },
];

const statusConfig: Record<OrgStatus, { icon: typeof CheckCircle2; color: string; label: string }> = {
  ACTIVE: { icon: CheckCircle2, color: "text-green-500", label: "Active" },
  SUSPENDED: { icon: XCircle, color: "text-red-500", label: "Suspended" },
  PENDING: { icon: Clock, color: "text-yellow-500", label: "Pending" },
};

export default function OrganizationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | OrgStatus>("ALL");

  const filtered = mockOrgs.filter(org => {
    const matchSearch = org.name.toLowerCase().includes(search.toLowerCase()) || org.slug.includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || org.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organizations</h1>
          <p className="text-muted-foreground mt-1">Manage all registered organizations.</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or slug..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {(["ALL", "ACTIVE", "PENDING", "SUSPENDED"] as const).map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${statusFilter === s ? "bg-[hsl(var(--brand-hue),70%,50%)] text-white" : "bg-[var(--surface-elevated)] text-muted-foreground hover:text-foreground"}`}>
                {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--surface-elevated)]">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Organization</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Plan</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Members</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Campaigns</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Created</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(org => {
                const status = statusConfig[org.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={org.id} className="border-b border-[var(--surface-elevated)] last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--brand-hue),60%,60%)] to-[hsl(var(--brand-hue),80%,45%)] flex items-center justify-center text-white text-xs font-bold">
                          {org.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{org.name}</div>
                          <div className="text-xs text-muted-foreground">/{org.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${org.plan === "ENTERPRISE" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : org.plan === "BUSINESS" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}>
                        {org.plan}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 text-xs ${status.color}`}>
                        <StatusIcon className="h-3.5 w-3.5" /> {status.label}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">{org.members}</td>
                    <td className="py-3 px-3 text-center">{org.campaigns}</td>
                    <td className="py-3 px-3 text-muted-foreground">{org.createdAt}</td>
                    <td className="py-3 px-3 text-right">
                      <Link href={`/superadmin/organizations/${org.id}`}>
                        <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4" /></Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No organizations found.</div>
        )}
      </Card>
    </div>
  );
}
