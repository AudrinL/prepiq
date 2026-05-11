"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Swords, Plus, Users, Clock, Trophy } from "lucide-react";

export default function ChallengesPage() {
  const activeChallenges = [
    { id: "1", name: "Weekend Warriors", creator: "Sarah J.", test: "Abstract Reasoning (Hard)", participants: 4, max: 5, timeLeft: "14 hours", status: "In Progress" },
    { id: "2", name: "Math Geniuses", creator: "You", test: "Numerical Reasoning", participants: 2, max: 10, timeLeft: "2 days", status: "Waiting" },
  ];

  const completedChallenges = [
    { id: "3", name: "Weekly Sprint", test: "Verbal Reasoning", participants: 8, myScore: 82, winner: "Alex M. (94%)", date: "Last week" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Group Challenges</h1>
          <p className="text-muted-foreground">Compete with friends or join public challenges to stay motivated.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">Join Code</Button>
          <Button className="gap-2"><Plus size={16} /> Create</Button>
        </div>
      </div>

      {/* Active Challenges */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Swords size={20} className="text-primary" /> Active Challenges
        </h2>
        {activeChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeChallenges.map(c => (
              <Card key={c.id} className="p-6 border-[var(--border)] hover:border-primary transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{c.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${c.status === 'In Progress' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Test: <span className="font-medium text-foreground">{c.test}</span></p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5"><Users size={16} /> {c.participants}/{c.max}</div>
                  <div className="flex items-center gap-1.5"><Clock size={16} /> {c.timeLeft}</div>
                </div>
                <div className="mt-auto">
                  <Button className="w-full" variant={c.creator === 'You' ? 'outline' : 'default'}>
                    {c.creator === 'You' ? 'Manage' : 'Play Now'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-dashed">
            <div className="w-16 h-16 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Swords size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No active challenges</h3>
            <p className="text-muted-foreground mb-6">Create a new challenge and invite your friends to compete!</p>
            <Button><Plus size={16} className="mr-2" /> Create Challenge</Button>
          </Card>
        )}
      </div>

      {/* Completed Challenges */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Trophy size={20} className="text-amber-500" /> Completed
        </h2>
        <Card className="overflow-hidden border border-[var(--border)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-[var(--surface-subtle)]">
                <tr>
                  <th className="px-6 py-4 font-medium">Challenge</th>
                  <th className="px-6 py-4 font-medium">Test</th>
                  <th className="px-6 py-4 font-medium text-center">Players</th>
                  <th className="px-6 py-4 font-medium text-center">Your Score</th>
                  <th className="px-6 py-4 font-medium text-center">Winner</th>
                  <th className="px-6 py-4 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {completedChallenges.map((row) => (
                  <tr key={row.id} className="bg-background hover:bg-[var(--surface-subtle)] transition-colors">
                    <td className="px-6 py-4 font-medium">{row.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.test}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.participants}</td>
                    <td className="px-6 py-4 text-center font-semibold">{row.myScore}%</td>
                    <td className="px-6 py-4 text-center font-medium text-amber-500">{row.winner}</td>
                    <td className="px-6 py-4 text-right text-muted-foreground">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
