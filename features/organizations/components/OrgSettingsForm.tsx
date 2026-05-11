"use client";

import * as React from "react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export function OrgSettingsForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Submit logic
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Organization Name</label>
        <Input id="name" defaultValue={initialData?.name} placeholder="Acme Corp" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="slug" className="text-sm font-medium">Organization Slug</label>
        <Input id="slug" defaultValue={initialData?.slug} placeholder="acme" disabled />
        <p className="text-xs text-muted-foreground">The slug cannot be changed after creation.</p>
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Contact Email</label>
        <Input id="email" type="email" defaultValue={initialData?.email} placeholder="contact@acme.com" required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  );
}
