"use client";

import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Trophy, Activity, Target, Flame, ChevronRight, Calculator, BookOpen, Shapes } from "lucide-react";

export default function DashboardOverviewPage() {
  // Mock Data
  const stats = {
    testsCompleted: 42,
    testsCompletedTrend: "+12",
    avgScore: 78,
    streak: 5,
    globalRank: "142"
  };

  const recentActivity = [
    { id: "1", test: "Numerical Reasoning", category: "NUMERICAL", date: "2 days ago", score: 84, time: "22m" },
    { id: "2", test: "Verbal Reasoning", category: "VERBAL", date: "4 days ago", score: 72, time: "18m" },
    { id: "3", test: "Abstract Reasoning", category: "ABSTRACT", date: "1 week ago", score: 65, time: "25m" },
    { id: "4", test: "Situational Judgment", category: "SITUATIONAL", date: "2 weeks ago", score: 90, time: "30m" },
    { id: "5", test: "Numerical Practice", category: "NUMERICAL", date: "2 weeks ago", score: 76, time: "24m" },
  ];

  const progressData = [
    { date: "Mar 1", NUMERICAL: 60, VERBAL: 65, ABSTRACT: 55 },
    { date: "Mar 8", NUMERICAL: 65, VERBAL: 68, ABSTRACT: 60 },
    { date: "Mar 15", NUMERICAL: 72, VERBAL: 70, ABSTRACT: 62 },
    { date: "Mar 22", NUMERICAL: 78, VERBAL: 71, ABSTRACT: 65 },
    { date: "Mar 29", NUMERICAL: 84, VERBAL: 72, ABSTRACT: 65 },
  ];

  const radarData = [
    { subject: "Numerical", A: 84, fullMark: 100 },
    { subject: "Verbal", A: 72, fullMark: 100 },
    { subject: "Abstract", A: 65, fullMark: 100 },
    { subject: "Situational", A: 90, fullMark: 100 },
    { subject: "Personality", A: 80, fullMark: 100 },
    { subject: "EQ", A: 85, fullMark: 100 },
  ];

  const recommended = [
    { id: "1", title: "Abstract Reasoning - Intermediate", icon: Shapes, score: "Your avg: 65%", color: "text-cyan-500", bg: "bg-cyan-500/10" },
    { id: "2", title: "Verbal Reasoning - Advanced", icon: BookOpen, score: "Your avg: 72%", color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Here&apos;s an overview of your preparation progress.</p>
        </div>
        <Link href="/dashboard/tests">
          <Button className="gap-2">Take a Test <ChevronRight size={16} /></Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-l-primary flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tests Completed</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold">{stats.testsCompleted}</h2>
              <span className="text-xs font-medium text-emerald-500">{stats.testsCompletedTrend}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Target size={24} />
          </div>
        </Card>
        
        <Card className="p-6 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Average Score</p>
            <h2 className="text-3xl font-bold">{stats.avgScore}%</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Activity size={24} />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
            <h2 className="text-3xl font-bold">{stats.streak} Days</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Flame size={24} />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-indigo-500 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Global Rank</p>
            <h2 className="text-3xl font-bold">#{stats.globalRank}</h2>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <Trophy size={24} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Score Progression</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--surface-elevated)", borderColor: "var(--border)", borderRadius: "0.5rem" }}
                  itemStyle={{ color: "var(--foreground)" }}
                />
                <Line type="monotone" dataKey="NUMERICAL" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="VERBAL" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="ABSTRACT" stroke="#06B6D4" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Radar Chart */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-6">Performance Profile</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
            <Link href="/dashboard/progress" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-[var(--surface-subtle)] rounded-xl transition-colors border border-transparent hover:border-[var(--border)]">
                <div>
                  <p className="font-semibold text-sm">{activity.test}</p>
                  <p className="text-xs text-muted-foreground">{activity.date} • {activity.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${activity.score >= 80 ? 'bg-emerald-500/10 text-emerald-500' : activity.score >= 60 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
                  {activity.score}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommended Tests */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-2">Recommended for you</h3>
          <p className="text-sm text-muted-foreground mb-6">Based on your recent performance, practice these areas to improve.</p>
          <div className="space-y-4">
            {recommended.map((test) => (
              <div key={test.id} className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-xl bg-[var(--surface-subtle)]">
                <div className={`w-12 h-12 rounded-xl ${test.bg} ${test.color} flex items-center justify-center shrink-0`}>
                  <test.icon size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{test.title}</h4>
                  <p className="text-xs text-muted-foreground">{test.score}</p>
                </div>
                <Button size="sm" variant="outline">Practice</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
