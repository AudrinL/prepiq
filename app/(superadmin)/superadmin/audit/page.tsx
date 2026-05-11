"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { ScrollText, Search, Filter, Download, User, Building2, Shield, Settings } from "lucide-react";

const mockEvents = [
  { id: "1", action: "org.created", actor: "admin@prepiq.com", target: "Acme Corporation", ip: "192.168.1.1", timestamp: "2026-05-07 19:12:00", severity: "info" },
  { id: "2", action: "org.suspended", actor: "admin@prepiq.com", target: "TestFraud Ltd", ip: "192.168.1.1", timestamp: "2026-05-07 18:30:00", severity: "warning" },
  { id: "3", action: "admin.login", actor: "dev@prepiq.com", target: "—", ip: "10.0.0.5", timestamp: "2026-05-07 14:32:00", severity: "info" },
  { id: "4", action: "user.deleted", actor: "support@prepiq.com", target: "user-4521", ip: "10.0.0.12", timestamp: "2026-05-07 11:00:00", severity: "warning" },
  { id: "5", action: "config.updated", actor: "admin@prepiq.com", target: "rate_limit_config", ip: "192.168.1.1", timestamp: "2026-05-07 09:45:00", severity: "info" },
  { id: "6", action: "org.plan_changed", actor: "system", target: "TechHire Global", ip: "—", timestamp: "2026-05-06 22:00:00", severity: "info" },
  { id: "7", action: "security.rate_limit", actor: "system", target: "/api/v1/tests", ip: "45.33.21.8", timestamp: "2026-05-06 16:20:00", severity: "error" },
  { id: "8", action: "admin.invite_sent", actor: "admin@prepiq.com", target: "qa@prepiq.com", ip: "192.168.1.1", timestamp: "2026-05-06 10:15:00", severity: "info" },
];

const actionIcons: Record<string, typeof User> = {
  "org.": Building2,
  "admin.": Shield,
  "user.": User,
  "config.": Settings,
  "security.": Shield,
};

function getIcon(action: string) {
  const prefix = Object.keys(actionIcons).find(k => action.startsWith(k));
  return prefix ? actionIcons[prefix] : ScrollText;
}

export default function AuditPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = mockEvents.filter(evt => {
    const matchSearch = evt.action.includes(search.toLowerCase()) || evt.actor.includes(search.toLowerCase()) || evt.target.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === "all" || evt.severity === severityFilter;
    return matchSearch && matchSeverity;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground mt-1">Track all administrative actions on the platform.</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-1" /> Export CSV</Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search actions, actors, targets..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <div className="flex gap-2">
            {["all", "info", "warning", "error"].map(s => (
              <button key={s} onClick={() => setSeverityFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${severityFilter === s ? "bg-[hsl(var(--brand-hue),70%,50%)] text-white" : "bg-[var(--surface-elevated)] text-muted-foreground hover:text-foreground"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          {filtered.map(evt => {
            const Icon = getIcon(evt.action);
            return (
              <div key={evt.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors">
                <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${evt.severity === "error" ? "bg-red-100 dark:bg-red-900/30 text-red-500" : evt.severity === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600" : "bg-[var(--surface-elevated)] text-muted-foreground"}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-sm font-medium">{evt.action}</code>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase ${evt.severity === "error" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" : evt.severity === "warning" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>
                      {evt.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    by <span className="text-foreground">{evt.actor}</span> &rarr; {evt.target} &middot; IP: {evt.ip}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">{evt.timestamp}</span>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">No events found.</div>}
      </Card>
    </div>
  );
}
