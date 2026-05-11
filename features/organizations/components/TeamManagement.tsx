"use client";

import * as React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export function TeamManagement({ members }: { members?: any[] }) {
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API call to invite
    setTimeout(() => {
      setLoading(false);
      setInviteEmail("");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[var(--surface-elevated)] p-4">
        <h3 className="mb-4 text-lg font-medium">Invite Team Member</h3>
        <form onSubmit={handleInvite} className="flex gap-4">
          <Input 
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@example.com"
            type="email" 
            required 
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Invite"}
          </Button>
        </form>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Active Members</h3>
        <div className="rounded-lg border border-[var(--surface-elevated)] divide-y divide-[var(--surface-elevated)]">
          {members?.length ? members.map((member: any) => (
            <div key={member.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{member.user?.name || member.user?.email}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          )) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No members found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
