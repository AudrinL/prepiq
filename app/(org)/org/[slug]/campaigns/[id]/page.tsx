"use client";

import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { ArrowLeft, Users, Mail, Download, Clock, CheckCircle2, ChevronDown } from "lucide-react";

export default function CampaignDetailPage({ params }: { params: { slug: string; id: string } }) {
  const campaign = {
    name: "Q1 2025 Graduate Assessment",
    status: "ACTIVE",
    invited: 45,
    completed: 28,
    averageScore: 76,
    endDate: "April 15, 2025",
    tests: ["Numerical Reasoning", "Verbal Reasoning"],
  };

  const participants = [
    { id: "1", name: "Sophie Chen", email: "sophie@example.com", status: "COMPLETED", score: 92, date: "2025-03-29" },
    { id: "2", name: "James Okafor", email: "james@example.com", status: "COMPLETED", score: 88, date: "2025-03-28" },
    { id: "3", name: "Alex Johnson", email: "alex@example.com", status: "IN_PROGRESS", score: null, date: "Started 1h ago" },
    { id: "4", name: "Maria Garcia", email: "maria@example.com", status: "INVITED", score: null, date: "Invited Mar 25" },
    { id: "5", name: "David Kim", email: "david@example.com", status: "COMPLETED", score: 65, date: "2025-03-26" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <Link href={`/org/${params.slug}/campaigns`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to Campaigns
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{campaign.name}</h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {campaign.status}
              </span>
            </div>
            <p className="text-muted-foreground">Ends on {campaign.endDate} &bull; {campaign.tests.join(" & ")}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2"><Download size={16} /> Export Results</Button>
            <Button className="gap-2"><Mail size={16} /> Invite Candidates</Button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total Invited</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold">{campaign.invited}</h2>
            <Users size={20} className="text-muted-foreground mb-1" />
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Completion Rate</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold">{Math.round((campaign.completed / campaign.invited) * 100)}%</h2>
            <span className="text-sm text-muted-foreground mb-1">({campaign.completed} completed)</span>
          </div>
          <div className="h-2 w-full bg-[var(--surface-default)] rounded-full overflow-hidden mt-4">
            <div className="h-full bg-primary" style={{ width: `${(campaign.completed / campaign.invited) * 100}%` }}></div>
          </div>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Average Score</p>
          <div className="flex items-end gap-3">
            <h2 className="text-3xl font-bold">{campaign.averageScore}%</h2>
            <span className="text-sm text-emerald-500 font-medium mb-1 border px-2 rounded-md bg-emerald-500/10 border-emerald-500/20">Good</span>
          </div>
        </Card>
      </div>

      {/* Participants Table */}
      <Card className="overflow-hidden border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-subtle)]">
          <h3 className="font-semibold text-lg">Participants</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">Status <ChevronDown size={14} /></Button>
            <Button variant="outline" size="sm" className="gap-2">Score <ChevronDown size={14} /></Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-[var(--surface-default)]">
              <tr>
                <th className="px-6 py-4 font-medium">Candidate</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-center">Score</th>
                <th className="px-6 py-4 font-medium text-right">Date / Activity</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {participants.map((row) => (
                <tr key={row.id} className="bg-background hover:bg-[var(--surface-subtle)] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{row.name}</p>
                    <p className="text-muted-foreground text-xs">{row.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {row.status === "COMPLETED" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 size={12} /> Completed
                      </span>
                    ) : row.status === "IN_PROGRESS" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-500">
                        <Clock size={12} /> In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--surface-elevated)] text-muted-foreground border border-[var(--border)]">
                        <Mail size={12} /> Invited
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.score !== null ? (
                      <span className={`font-bold ${row.score >= 80 ? "text-emerald-500" : row.score >= 60 ? "text-amber-500" : "text-red-500"}`}>
                        {row.score}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{row.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={row.status === "COMPLETED" ? "text-primary hover:bg-primary/10" : "text-muted-foreground"}
                      disabled={row.status !== "COMPLETED"}
                    >
                      View Report
                    </Button>
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
