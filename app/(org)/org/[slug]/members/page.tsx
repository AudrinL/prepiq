"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Shield, Mail, MoreHorizontal, UserPlus, Trash2, CheckCircle2 } from "lucide-react";

export default function OrgMembersPage() {
  const [members, setMembers] = useState([
    { id: "1", name: "Alex Admin", email: "admin@acme.com", role: "ADMIN", status: "ACTIVE" },
    { id: "2", name: "Sarah Manager", email: "sarah@acme.com", role: "MANAGER", status: "ACTIVE" },
    { id: "3", name: "John Viewer", email: "john@acme.com", role: "VIEWER", status: "INVITED" },
  ]);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("VIEWER");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    setMembers([
      ...members,
      {
        id: Date.now().toString(),
        name: "Pending User",
        email: inviteEmail,
        role: inviteRole,
        status: "INVITED"
      }
    ]);
    setInviteEmail("");
    setShowInvite(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Team Members</h1>
          <p className="text-muted-foreground">Manage who has access to your organization dashboard.</p>
        </div>
        <Button onClick={() => setShowInvite(true)} className="gap-2"><UserPlus size={16} /> Invite Member</Button>
      </div>

      {showInvite && (
        <Card className="p-6 border-primary/20 bg-primary/5 animate-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Invite New Member</h3>
            <button onClick={() => setShowInvite(false)} className="text-muted-foreground hover:text-foreground">✕</button>
          </div>
          <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input 
                type="email" 
                placeholder="colleague@company.com" 
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                required
                className="w-full bg-background"
              />
            </div>
            <div className="w-full sm:w-48">
              <select 
                className="flex h-10 w-full rounded-md border border-[var(--border)] bg-background px-3 py-2 text-sm"
                value={inviteRole}
                onChange={e => setInviteRole(e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Manager</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
            <Button type="submit" className="w-full sm:w-auto">Send Invite</Button>
          </form>
        </Card>
      )}

      <Card className="overflow-hidden border border-[var(--border)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-[var(--surface-subtle)] border-b border-[var(--border)]">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {members.map((member) => (
                <tr key={member.id} className="bg-background hover:bg-[var(--surface-subtle)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center font-bold border border-[var(--border)]">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.name}</p>
                        <p className="text-muted-foreground text-xs">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className={member.role === 'ADMIN' ? 'text-primary' : 'text-muted-foreground'} />
                      <span className={`font-medium ${member.role === 'ADMIN' ? 'text-primary' : 'text-foreground'}`}>
                        {member.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {member.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 size={12} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500">
                        <Mail size={12} /> Invited
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {member.status === 'INVITED' && (
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">Resend</Button>
                      )}
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                        <Trash2 size={16} />
                      </Button>
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
