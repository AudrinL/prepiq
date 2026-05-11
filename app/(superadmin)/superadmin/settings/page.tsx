"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Settings, Save, Shield, Globe, Bell, Database, AlertTriangle } from "lucide-react";

export default function SuperAdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground mt-1">Configure global platform behavior.</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" /> {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* General */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe className="h-4 w-4" /> General</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Platform Name</label>
            <Input defaultValue="PrepIQ" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Support Email</label>
            <Input defaultValue="support@prepiq.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Default Timezone</label>
            <select className="w-full rounded-md border border-[var(--surface-elevated)] bg-background px-3 py-2 text-sm">
              <option>UTC</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
              <option>Asia/Tokyo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Default Language</label>
            <select className="w-full rounded-md border border-[var(--surface-elevated)] bg-background px-3 py-2 text-sm">
              <option>English</option>
              <option>French</option>
              <option>German</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield className="h-4 w-4" /> Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">Enforce 2FA for Admins</div>
              <div className="text-xs text-muted-foreground">Require two-factor authentication for all admin accounts.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--brand-hue),70%,50%)]" />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">IP Allowlisting</div>
              <div className="text-xs text-muted-foreground">Restrict admin panel access to specific IPs.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--brand-hue),70%,50%)]" />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Session Timeout (minutes)</label>
            <Input type="number" defaultValue="60" className="max-w-xs" />
          </div>
        </div>
      </Card>

      {/* Rate Limiting */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Database className="h-4 w-4" /> Rate Limiting</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">API Rate Limit (req/min)</label>
            <Input type="number" defaultValue="100" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Guest Test Limit</label>
            <Input type="number" defaultValue="3" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Max Concurrent Tests per User</label>
            <Input type="number" defaultValue="1" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Webhook Retry Count</label>
            <Input type="number" defaultValue="3" />
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</h3>
        <div className="space-y-4">
          {[
            { label: "New Org Registration", desc: "Notify admins when a new organization signs up.", checked: true },
            { label: "Rate Limit Alerts", desc: "Alert when rate limiting triggers frequently.", checked: true },
            { label: "System Health Alerts", desc: "Notify on error rate spikes or downtime.", checked: true },
            { label: "Billing Events", desc: "Notify on failed payments or plan changes.", checked: false },
          ].map((n) => (
            <div key={n.label} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{n.label}</div>
                <div className="text-xs text-muted-foreground">{n.desc}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={n.checked} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[hsl(var(--brand-hue),70%,50%)]" />
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger */}
      <Card className="p-6 border-red-200 dark:border-red-900/50">
        <h3 className="font-semibold mb-4 flex items-center gap-2 text-red-500"><AlertTriangle className="h-4 w-4" /> Danger Zone</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">Maintenance Mode</div>
            <div className="text-xs text-muted-foreground">Redirect all users to the maintenance page.</div>
          </div>
          <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">
            Enable Maintenance
          </Button>
        </div>
      </Card>
    </div>
  );
}
