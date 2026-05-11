"use client";

import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Search, Filter, Download, ScatterChart as ScatterChartIcon } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function OrgResultsPage() {
  const results = [
    { id: "1", candidate: "Sophie Chen", campaign: "Q1 Graduate", test: "Numerical", score: 92, time: "22m", date: "2025-03-29" },
    { id: "2", candidate: "James Okafor", campaign: "Q1 Graduate", test: "Abstract", score: 88, time: "28m", date: "2025-03-28" },
    { id: "3", candidate: "David Kim", campaign: "Engineering", test: "Numerical", score: 65, time: "30m", date: "2025-03-26" },
    { id: "4", candidate: "Maria Garcia", campaign: "Sales", test: "Personality", score: 85, time: "15m", date: "2025-03-25" },
    { id: "5", candidate: "Alex Johnson", campaign: "Q1 Graduate", test: "Verbal", score: 78, time: "25m", date: "2025-03-24" },
    { id: "6", candidate: "Sarah Jenkins", campaign: "Engineering", test: "Abstract", score: 95, time: "20m", date: "2025-03-23" },
  ];

  // Scatter chart data (mock distribution)
  const scatterData = Array.from({ length: 50 }).map((_, i) => ({
    time: Math.floor(Math.random() * 20) + 10, // 10-30 mins
    score: Math.floor(Math.random() * 50) + 50, // 50-100 score
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Global Results</h1>
          <p className="text-muted-foreground">Explore all candidate results across all campaigns.</p>
        </div>
        <Button variant="outline" className="gap-2"><Download size={16} /> Export CSV</Button>
      </div>

      {/* Distribution Chart */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ScatterChartIcon size={20} className="text-primary" /> Score vs Time Distribution
          </h3>
          <select className="bg-[var(--surface-subtle)] border border-[var(--border)] rounded-md text-sm px-3 py-1.5">
            <option>All Campaigns</option>
            <option>Q1 Graduate</option>
            <option>Engineering</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" dataKey="time" name="Time (mins)" unit="m" stroke="var(--muted-foreground)" fontSize={12} label={{ value: 'Time Taken', position: 'bottom', fill: 'var(--muted-foreground)', fontSize: 12 }} />
              <YAxis type="number" dataKey="score" name="Score" unit="%" stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} label={{ value: 'Score %', angle: -90, position: 'insideLeft', fill: 'var(--muted-foreground)', fontSize: 12 }} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "0.5rem" }}
                itemStyle={{ color: "var(--foreground)" }}
              />
              <Scatter name="Candidates" data={scatterData} fill="var(--primary)" fillOpacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Filters & Table */}
      <Card className="overflow-hidden border border-[var(--border)]">
        <div className="p-4 border-b border-[var(--border)] flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--surface-subtle)]">
          <div className="flex-1 relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search candidate name or email..." 
              className="w-full bg-background border border-[var(--border)] rounded-md pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <select className="bg-background border border-[var(--border)] rounded-md text-sm px-3 py-2 w-full md:w-auto">
              <option value="">All Tests</option>
              <option value="num">Numerical</option>
              <option value="verb">Verbal</option>
            </select>
            <Button variant="outline" size="sm" className="gap-2 shrink-0 h-auto py-2">
              <Filter size={16} /> Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-[var(--surface-default)] border-b border-[var(--border)]">
              <tr>
                <th className="px-6 py-4 font-medium">Candidate</th>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Test</th>
                <th className="px-6 py-4 font-medium text-center">Score</th>
                <th className="px-6 py-4 font-medium text-center">Time</th>
                <th className="px-6 py-4 font-medium text-right">Date</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {results.map((row) => (
                <tr key={row.id} className="bg-background hover:bg-[var(--surface-subtle)] transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{row.candidate}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.campaign}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.test}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.score >= 80 ? 'bg-emerald-500/10 text-emerald-500' : row.score >= 60 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                      {row.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-muted-foreground">{row.time}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{row.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">View Report</Button>
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
