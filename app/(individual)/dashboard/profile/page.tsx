"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Camera, Save, AlertTriangle, Key, Bell, Shield, Trash2, Award, Clock, Star } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("user1@prepiq.com");
  const [timezone, setTimezone] = useState("UTC");
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Avatar & Basic Info */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold border-2 border-primary/20 relative group overflow-hidden">
                  AJ
                  <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-colors">
                    <Camera className="text-white" size={24} />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">Upload Photo</Button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <Input value={email} readOnly className="bg-[var(--surface-subtle)] text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Timezone</label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-[var(--border)] bg-background px-3 py-2 text-sm"
                      value={timezone}
                      onChange={e => setTimezone(e.target.value)}
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select className="flex h-10 w-full rounded-md border border-[var(--border)] bg-background px-3 py-2 text-sm">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button className="gap-2"><Save size={16} /> Save Changes</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield size={20} className="text-primary" /> Security
            </h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Current Password</label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <Input type="password" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                <Input type="password" />
              </div>
              <div className="pt-2">
                <Button variant="secondary" className="gap-2"><Key size={16} /> Update Password</Button>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-8 border-red-500/20">
            <h2 className="text-xl font-semibold mb-2 text-red-500 flex items-center gap-2">
              <AlertTriangle size={20} /> Danger Zone
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" className="gap-2"><Trash2 size={16} /> Delete Account</Button>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Profile Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Score</p>
                  <p className="font-semibold">90% (Situational)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Practicing</p>
                  <p className="font-semibold">14h 25m</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Star size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Strongest Area</p>
                  <p className="font-semibold">Numerical</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Bell size={20} className="text-primary" /> Notifications
            </h3>
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" defaultChecked />
                <div>
                  <p className="font-medium text-sm">Weekly Report</p>
                  <p className="text-xs text-muted-foreground">Receive a summary of your progress every week.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" defaultChecked />
                <div>
                  <p className="font-medium text-sm">Campaign Invites</p>
                  <p className="text-xs text-muted-foreground">Get notified when an organization invites you to a test.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" defaultChecked />
                <div>
                  <p className="font-medium text-sm">Challenge Updates</p>
                  <p className="text-xs text-muted-foreground">Alerts for new group challenges and results.</p>
                </div>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
