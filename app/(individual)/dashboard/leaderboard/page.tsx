"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Trophy, Medal, Star } from "lucide-react";

const TABS = ["ALL", "NUMERICAL", "VERBAL", "ABSTRACT", "SITUATIONAL"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  const distributionData = [
    { range: "0-10", users: 120 },
    { range: "10-20", users: 340 },
    { range: "20-30", users: 890 },
    { range: "30-40", users: 1500 },
    { range: "40-50", users: 3200 },
    { range: "50-60", users: 4800 },
    { range: "60-70", users: 6100 },
    { range: "70-80", users: 4200 },
    { range: "80-90", users: 1800 },
    { range: "90-100", users: 450 },
  ];

  const leaderboard = [
    { rank: 1, name: "S. Williams", initials: "SW", score: 98, tests: 142, active: "2h ago", isCurrentUser: false },
    { rank: 2, name: "J. Chen", initials: "JC", score: 97, tests: 89, active: "1h ago", isCurrentUser: false },
    { rank: 3, name: "M. Garcia", initials: "MG", score: 96, tests: 210, active: "5m ago", isCurrentUser: false },
    { rank: 4, name: "A. Patel", initials: "AP", score: 95, tests: 64, active: "1d ago", isCurrentUser: false },
    { rank: 142, name: "Alex Johnson", initials: "AJ", score: 84, tests: 42, active: "Just now", isCurrentUser: true },
    // ... we would have 50 in real life
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Global Leaderboard</h1>
        <p className="text-muted-foreground">See how you stack up against 50,000+ candidates worldwide.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab ? 'bg-primary text-primary-foreground shadow-md' : 'bg-[var(--surface-default)] text-muted-foreground hover:text-foreground hover:bg-[var(--surface-subtle)] border border-[var(--border)]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Rank Card */}
        <Card className="p-8 lg:col-span-1 bg-gradient-to-br from-primary to-indigo-600 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <Trophy size={48} className="mb-4 text-amber-300" />
          <h2 className="text-xl font-medium text-primary-foreground/80 mb-2">Your Rank</h2>
          <div className="text-6xl font-bold mb-4 tracking-tighter">#142</div>
          <div className="inline-flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
            <Star size={16} className="text-amber-300 fill-amber-300" />
            <span className="font-semibold">Top 12% globally</span>
          </div>
        </Card>

        {/* Distribution Chart */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-lg mb-6">Score Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="range" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'var(--surface-subtle)' }}
                  contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "0.5rem" }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Bar dataKey="users" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Leaderboard Table */}
      <Card className="overflow-hidden border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-subtle)]">
          <h3 className="font-semibold text-lg">Top 50 Candidates</h3>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Live Updates
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-[var(--surface-default)]">
              <tr>
                <th className="px-6 py-4 font-medium w-24">Rank</th>
                <th className="px-6 py-4 font-medium">Candidate</th>
                <th className="px-6 py-4 font-medium text-center">Score</th>
                <th className="px-6 py-4 font-medium text-center">Tests Taken</th>
                <th className="px-6 py-4 font-medium text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {leaderboard.map((row) => (
                <tr 
                  key={row.rank} 
                  className={`${row.isCurrentUser ? 'bg-primary/5 ring-1 ring-inset ring-primary' : 'bg-background hover:bg-[var(--surface-subtle)]'} transition-colors`}
                >
                  <td className="px-6 py-4 font-medium">
                    {row.rank === 1 ? <Medal size={24} className="text-amber-400" /> : 
                     row.rank === 2 ? <Medal size={24} className="text-slate-300" /> : 
                     row.rank === 3 ? <Medal size={24} className="text-amber-700" /> : 
                     <span className="text-muted-foreground w-6 inline-block text-center">{row.rank}</span>}
                  </td>
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${row.isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-[var(--surface-elevated)] text-muted-foreground'}`}>
                      {row.initials}
                    </div>
                    <span className={row.isCurrentUser ? "text-primary" : ""}>
                      {row.name} {row.isCurrentUser && "(You)"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${row.score >= 90 ? 'text-emerald-500' : 'text-foreground'}`}>{row.score}%</span>
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground">{row.tests}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{row.active}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
