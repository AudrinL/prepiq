"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Search, Plus, Filter, Edit, Trash2, Eye, FileQuestion } from "lucide-react";

const categories = ["Numerical", "Verbal", "Abstract", "SJT", "Personality", "EQ"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

const mockQuestions = [
  { id: "Q-001", text: "If a product costs $45 and is discounted by 20%, what is the sale price?", category: "Numerical", difficulty: "Beginner", status: "Active", uses: 1240 },
  { id: "Q-002", text: "Which of the following best summarizes the author\u0027s main argument?", category: "Verbal", difficulty: "Intermediate", status: "Active", uses: 890 },
  { id: "Q-003", text: "Identify the next shape in the pattern sequence.", category: "Abstract", difficulty: "Advanced", status: "Active", uses: 670 },
  { id: "Q-004", text: "A colleague takes credit for your work in a meeting. What do you do?", category: "SJT", difficulty: "Intermediate", status: "Active", uses: 1100 },
  { id: "Q-005", text: "Rate how strongly you agree: I enjoy working under pressure.", category: "Personality", difficulty: "Beginner", status: "Draft", uses: 0 },
  { id: "Q-006", text: "A team member appears upset. How would you approach them?", category: "EQ", difficulty: "Beginner", status: "Active", uses: 450 },
  { id: "Q-007", text: "Calculate the compound interest on $10,000 at 5% for 3 years.", category: "Numerical", difficulty: "Advanced", status: "Retired", uses: 2100 },
];

export default function QuestionsPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");

  const filtered = mockQuestions.filter(q => {
    const matchSearch = q.text.toLowerCase().includes(search.toLowerCase()) || q.id.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || q.category === catFilter;
    const matchDiff = diffFilter === "All" || q.difficulty === diffFilter;
    return matchSearch && matchCat && matchDiff;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground mt-1">Manage psychometric questions across all categories.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-1" /> Create Question</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map(cat => {
          const count = mockQuestions.filter(q => q.category === cat).length;
          return (
            <Card key={cat} className="p-3 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCatFilter(cat === catFilter ? "All" : cat)}>
              <div className={`text-lg font-bold ${catFilter === cat ? "text-[hsl(var(--brand-hue),70%,50%)]" : ""}`}>{count}</div>
              <div className="text-xs text-muted-foreground">{cat}</div>
            </Card>
          );
        })}
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="rounded-md border border-[var(--surface-elevated)] bg-background px-3 py-2 text-sm">
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)} className="rounded-md border border-[var(--surface-elevated)] bg-background px-3 py-2 text-sm">
            <option value="All">All Levels</option>
            {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--surface-elevated)]">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">ID</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Question</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Category</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Difficulty</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Uses</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id} className="border-b border-[var(--surface-elevated)] last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-muted-foreground">{q.id}</td>
                  <td className="py-3 px-3 max-w-xs truncate">{q.text}</td>
                  <td className="py-3 px-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-elevated)]">{q.category}</span></td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${q.difficulty === "Advanced" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : q.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"}`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-xs ${q.status === "Active" ? "text-green-500" : q.status === "Draft" ? "text-yellow-500" : "text-gray-400"}`}>{q.status}</span>
                  </td>
                  <td className="py-3 px-3 text-center text-muted-foreground">{q.uses.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    </div>
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
