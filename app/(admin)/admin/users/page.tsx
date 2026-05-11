"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Search, Filter, MoreHorizontal, Download, UserPlus, Shield, Ban } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "INDIVIDUAL", plan: "Pro", tests: 47, joined: "2025-10-15", status: "Active" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "INDIVIDUAL", plan: "Free", tests: 3, joined: "2026-04-20", status: "Active" },
  { id: "3", name: "Carol White", email: "carol@acme.com", role: "ORG_MEMBER", plan: "Enterprise", tests: 12, joined: "2026-01-08", status: "Active" },
  { id: "4", name: "Dave Brown", email: "dave@test.com", role: "INDIVIDUAL", plan: "Pro", tests: 89, joined: "2025-08-03", status: "Banned" },
  { id: "5", name: "Eve Davis", email: "eve@techhire.com", role: "ORG_ADMIN", plan: "Business", tests: 5, joined: "2025-12-22", status: "Active" },
  { id: "6", name: "Frank Lee", email: "frank@edu.ac", role: "INDIVIDUAL", plan: "Free", tests: 1, joined: "2026-05-01", status: "Active" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground mt-1">Manage platform users and their access.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-1" /> Export</Button>
          <Button><UserPlus className="h-4 w-4 mr-1" /> Add User</Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {["ALL", "INDIVIDUAL", "ORG_MEMBER", "ORG_ADMIN"].map(r => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${roleFilter === r ? "bg-[hsl(var(--brand-hue),70%,50%)] text-white" : "bg-[var(--surface-elevated)] text-muted-foreground"}`}>
                {r === "ALL" ? "All" : r.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--surface-elevated)]">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">User</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Plan</th>
                <th className="text-center py-3 px-3 font-medium text-muted-foreground">Tests</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Joined</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-b border-[var(--surface-elevated)] last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--brand-hue),60%,60%)] to-[hsl(var(--brand-hue),80%,45%)] flex items-center justify-center text-white text-xs font-bold">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[var(--surface-elevated)]">{user.role}</span></td>
                  <td className="py-3 px-3 text-muted-foreground">{user.plan}</td>
                  <td className="py-3 px-3 text-center">{user.tests}</td>
                  <td className="py-3 px-3 text-muted-foreground">{user.joined}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs ${user.status === "Active" ? "text-green-500" : "text-red-500"}`}>{user.status}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
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
