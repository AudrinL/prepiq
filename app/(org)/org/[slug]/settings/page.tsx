"use client";

import { useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Save, Upload, Palette, Building2, CreditCard, Webhook, CheckCircle2, Plus } from "lucide-react";

export default function OrgSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  
  const [orgName, setOrgName] = useState("Acme Corp");
  const [industry, setIndustry] = useState("Technology");
  
  const [primaryColor, setPrimaryColor] = useState("#F97316");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [webhookUrl, setWebhookUrl] = useState("https://api.acme.com/webhooks/prepiq");
  const [webhookSecret, setWebhookSecret] = useState("whsec_*******************");
  
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // Real implementation would POST to /api/v1/organizations/:id
  };

  const TABS = [
    { id: "general", label: "General", icon: Building2 },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "integrations", label: "Integrations", icon: Webhook },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Organization Settings</h1>
        <p className="text-muted-foreground">Manage your organization&apos;s profile, branding, and billing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-[var(--surface-subtle)] hover:text-foreground'}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-8">
          {saved && (
            <div className="p-4 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-lg flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={18} /> Settings saved successfully.
            </div>
          )}

          {activeTab === "general" && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-6 border-b border-[var(--border)] pb-4">General Settings</h2>
              <div className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Organization Name</label>
                  <Input value={orgName} onChange={e => setOrgName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-[var(--border)] bg-background px-3 py-2 text-sm"
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSave} className="gap-2"><Save size={16} /> Save Changes</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "branding" && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-6 border-b border-[var(--border)] pb-4">White-label Branding</h2>
              <div className="space-y-8 max-w-lg">
                <div>
                  <label className="block text-sm font-medium mb-2">Organization Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-16 bg-[var(--surface-subtle)] border border-dashed border-[var(--border)] rounded-lg flex items-center justify-center overflow-hidden">
                      {logoPreview ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={logoPreview} alt="Logo" className="max-w-full max-h-full object-contain" />
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">No logo</span>
                      )}
                    </div>
                    <Button variant="outline" className="gap-2"><Upload size={16} /> Upload Logo</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Recommended size: 400x100px. PNG or SVG.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Primary Brand Color</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={e => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                    />
                    <Input 
                      value={primaryColor} 
                      onChange={e => setPrimaryColor(e.target.value)} 
                      className="w-32 uppercase font-mono" 
                    />
                  </div>
                  
                  {/* Live Preview */}
                  <div className="mt-6 p-6 border border-[var(--border)] rounded-xl bg-[var(--surface-default)]" style={{ "--primary": primaryColor } as React.CSSProperties}>
                    <h4 className="text-sm font-medium mb-4 text-muted-foreground">Live Component Preview</h4>
                    <div className="flex gap-4">
                      <Button style={{ backgroundColor: "var(--primary)" }} className="text-white">Primary Button</Button>
                      <div className="flex items-center justify-center w-10 h-10 rounded-full text-white" style={{ backgroundColor: "var(--primary)" }}>
                        <CheckCircle2 size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border)]">
                  <Button onClick={handleSave} className="gap-2"><Save size={16} /> Save Branding</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "billing" && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-6 border-b border-[var(--border)] pb-4">Billing & Plan</h2>
              
              <div className="bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl p-6 mb-8 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-primary">Pro Plan</h3>
                  <p className="text-muted-foreground mt-1">120 / 500 candidate seats used this billing cycle.</p>
                </div>
                <Button variant="outline">Manage Subscription</Button>
              </div>

              <h3 className="font-semibold text-lg mb-4">Payment Methods</h3>
              <div className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-slate-200 dark:bg-slate-800 rounded flex items-center justify-center font-bold text-slate-500">VISA</div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/2026</p>
                  </div>
                </div>
                <span className="text-sm font-medium bg-[var(--surface-subtle)] px-2 py-1 rounded">Default</span>
              </div>
              <Button variant="outline" size="sm" className="gap-2"><Plus size={16} /> Add Payment Method</Button>
            </Card>
          )}

          {activeTab === "integrations" && (
            <Card className="p-8">
              <h2 className="text-xl font-semibold mb-6 border-b border-[var(--border)] pb-4 flex justify-between items-center">
                Webhooks
                <span className="text-xs font-medium bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded">Enterprise</span>
              </h2>
              <div className="space-y-6 max-w-xl">
                <p className="text-muted-foreground text-sm">
                  Configure webhooks to receive real-time notifications when candidates complete their assessments. This is useful for integrating with your ATS (Applicant Tracking System).
                </p>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Endpoint URL</label>
                  <Input value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Webhook Secret</label>
                  <Input type="password" value={webhookSecret} readOnly />
                  <p className="text-xs text-muted-foreground mt-1">Used to verify the webhook signature.</p>
                </div>
                
                <div className="pt-4 border-t border-[var(--border)] flex gap-3">
                  <Button onClick={handleSave} className="gap-2"><Save size={16} /> Save Webhook</Button>
                  <Button variant="outline">Send Test Event</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
