"use client";

import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Plus, Search, Filter, MoreHorizontal, Megaphone } from "lucide-react";

export default function CampaignsPage({ params }: { params: { slug: string } }) {
  const campaigns = [
    { id: "1", name: "Q1 2025 Graduate Assessment", status: "ACTIVE", candidates: 45, startDate: "2025-01-15", endDate: "2025-04-15" },
    { id: "2", name: "Engineering Team Aptitude", status: "ACTIVE", candidates: 12, startDate: "2025-03-01", endDate: "2025-03-30" },
    { id: "3", name: "Sales Personality Profiles", status: "DRAFT", candidates: 0, startDate: "-", endDate: "-" },
    { id: "4", name: "2024 Fall Intake", status: "COMPLETED", candidates: 120, startDate: "2024-09-01", endDate: "2024-11-30" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Campaigns</h1>
          <p className="text-muted-foreground">Manage your assessment campaigns and invite candidates.</p>
        </div>
        <Link href={`/org/${params.slug}/campaigns/new`}>
          <Button className="gap-2"><Plus size={16} /> New Campaign</Button>
        </Link>
      </div>

      <Card className="overflow-hidden border border-[var(--border)]">
        <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[var(--surface-subtle)]">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="w-full bg-background border border-[var(--border)] rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2 shrink-0">
            <Filter size={16} /> Filter
          </Button>
        </div>
        
        {campaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-[var(--surface-default)] border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-4 font-medium">Campaign Name</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Candidates</th>
                  <th className="px-6 py-4 font-medium">Date Range</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {campaigns.map((row) => (
                  <tr key={row.id} className="bg-background hover:bg-[var(--surface-subtle)] transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      <Link href={`/org/${params.slug}/campaigns/${row.id}`} className="hover:text-primary transition-colors">
                        {row.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        row.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 
                        row.status === 'COMPLETED' ? 'bg-[var(--surface-elevated)] text-muted-foreground' : 
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{row.candidates} invited</td>
                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                      {row.startDate} — {row.endDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Megaphone size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-6">Create your first assessment campaign to get started.</p>
            <Link href={`/org/${params.slug}/campaigns/new`}>
              <Button><Plus size={16} className="mr-2" /> Create Campaign</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
