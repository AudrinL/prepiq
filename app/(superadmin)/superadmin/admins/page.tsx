"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { ShieldCheck, Plus, Search, MoreHorizontal, Mail } from "lucide-react";

const mockAdmins = [
  { id: "1", name: "Super Admin", email: "admin@prepiq.com", role: "SUPER_ADMIN", lastLogin: "2026-05-07 19:00", status: "Active" },
  { id: "2", name: "Dev Admin", email: "dev@prepiq.com", role: "SUPER_ADMIN", lastLogin: "2026-05-07 14:32", status: "Active" },
  { id: "3", name: "Support Lead", email: "support@prepiq.com", role: "ADMIN", lastLogin: "2026-05-06 09:15", status: "Active" },
  { id: "4", name: "QA Admin", email: "qa@prepiq.com", role: "ADMIN", lastLogin: "2026-05-01 11:00", status: "Inactive" },
];

export default function AdminsPage() {
  const [search, setSearch] = useState("");
  const [showInvite, setShowInvite] = useState(false);

  const filtered = mockAdmins.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Admins</h1>
          <p className="text-muted-foreground mt-1">Manage super admin and admin access.</p>
        </div>
        <Button onClick={() => setShowInvite(!showInvite)}><Plus className="h-4 w-4 mr-1" /> Invite Admin</Button>
      </div>

      {showInvite && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Mail className="h-4 w-4" /> Invite New Admin</h3>
          <div className="flex gap-3">
            <Input placeholder="admin@example.com" className="flex-1" />
            <select className="rounded-md border border-[var(--surface-elevated)] bg-background px-3 py-2 text-sm">
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
            <Button>Send Invite</Button>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search admins..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--surface-elevated)]">
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Admin</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Last Login</th>
                <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(admin => (
                <tr key={admin.id} className="border-b border-[var(--surface-elevated)] last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--brand-hue),60%,60%)] to-[hsl(var(--brand-hue),80%,45%)] flex items-center justify-center text-white text-xs font-bold">
                        {admin.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{admin.name}</div>
                        <div className="text-xs text-muted-foreground">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${admin.role === "SUPER_ADMIN" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"}`}>
                      {admin.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{admin.lastLogin}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 text-xs ${admin.status === "Active" ? "text-green-500" : "text-gray-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${admin.status === "Active" ? "bg-green-500" : "bg-gray-400"}`} /> {admin.status}
                    </span>
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
