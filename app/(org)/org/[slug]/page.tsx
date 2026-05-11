"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Megaphone, Users, Target, Activity, Zap, Plus, ArrowRight } from "lucide-react";

export default function OrgOverviewPage({ params }: { params: { slug: string } }) {
  const stats = {
    activeCampaigns: 3,
    totalInvited: 120,
    completionRate: 68,
    averageScore: 74
  };

  const seats = {
    used: 120,
    limit: 500
  };

  const activeCampaigns = [
    { id: "1", name: "Q1 2025 Graduate Assessment", progress: 60, deadline: "2 days left" },
    { id: "2", name: "Engineering Team Aptitude", progress: 85, deadline: "4 days left" },
    { id: "3", name: "Sales Personality Profiles", progress: 30, deadline: "2 weeks left" }
  ];

  const [feed, setFeed] = useState([
    { id: 1, text: "Sophie Chen completed Numerical Reasoning — 92%", time: "5m ago" },
    { id: 2, text: "James Okafor completed Abstract Reasoning — 88%", time: "15m ago" },
    { id: 3, text: "Alex Johnson started Verbal Reasoning", time: "1h ago" },
    { id: 4, text: "Campaign 'Engineering Team Aptitude' was published", time: "2h ago" },
  ]);

  // Simulate SSE
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.7) {
        setFeed(prev => [
          { id: Date.now(), text: `New candidate completed assessment — ${Math.floor(Math.random() * 30 + 65)}%`, time: "Just now" },
          ...prev.slice(0, 9)
        ]);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const seatPercentage = (seats.used / seats.limit) * 100;
  const seatColor = seatPercentage > 90 ? 'bg-red-500' : seatPercentage > 70 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Organization Overview</h1>
          <p className="text-muted-foreground">Monitor candidate assessments and campaign performance.</p>
        </div>
        <Link href={`/org/${params.slug}/campaigns/new`}>
          <Button className="gap-2"><Plus size={16} /> New Campaign</Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 flex items-center justify-between border-l-4 border-l-primary">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
            <h2 className="text-3xl font-bold mt-1">{stats.activeCampaigns}</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Megaphone size={24} />
          </div>
        </Card>
        
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Invited</p>
            <h2 className="text-3xl font-bold mt-1">{stats.totalInvited}</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Users size={24} />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
            <h2 className="text-3xl font-bold mt-1">{stats.completionRate}%</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Target size={24} />
          </div>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Average Score</p>
            <h2 className="text-3xl font-bold mt-1">{stats.averageScore}%</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Activity size={24} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Campaigns */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Top Active Campaigns</h3>
              <Link href={`/org/${params.slug}/campaigns`} className="text-sm text-primary hover:underline">View All</Link>
            </div>
            <div className="space-y-6">
              {activeCampaigns.map(c => (
                <div key={c.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-sm">{c.name}</span>
                    <span className="text-xs font-medium bg-[var(--surface-subtle)] px-2 py-1 rounded-md">{c.deadline}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-full bg-[var(--surface-default)] rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${c.progress}%` }}></div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground w-10">{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Seats Meter */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2"><Users size={20} className="text-muted-foreground" /> Plan Seats Usage</h3>
              <span className="text-sm text-muted-foreground">{seats.used} / {seats.limit} used</span>
            </div>
            <div className="h-3 w-full bg-[var(--surface-default)] rounded-full overflow-hidden mb-4">
              <div className={`h-full ${seatColor}`} style={{ width: `${seatPercentage}%` }}></div>
            </div>
            {seatPercentage > 80 && (
              <div className="flex justify-between items-center bg-amber-500/10 text-amber-600 dark:text-amber-400 p-3 rounded-lg text-sm font-medium">
                <span>You are nearing your seat limit.</span>
                <Link href={`/org/${params.slug}/settings#billing`} className="hover:underline flex items-center gap-1">Upgrade Plan <ArrowRight size={14} /></Link>
              </div>
            )}
          </Card>
        </div>

        {/* Live Feed */}
        <Card className="p-6 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--border)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <h3 className="font-semibold text-lg">Live Activity</h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {feed.map(item => (
              <div key={item.id} className="flex gap-4 animate-in slide-in-from-right-2 fade-in duration-300">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
