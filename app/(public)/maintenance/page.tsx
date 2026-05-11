import { db } from "@/shared/lib/db";
import { Wrench } from "lucide-react";

export const revalidate = 60; // Check every minute

export default async function MaintenancePage() {
  let message = "We're currently upgrading the platform to serve you better. Please check back shortly.";
  
  try {
    const settings = await db.platformSettings.findUnique({
      where: { id: 'singleton' }
    });
    if (settings?.maintenanceMessage) {
      message = settings.maintenanceMessage;
    }
  } catch (e) {
    // Ignore and use default
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background">
      <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 animate-pulse">
        <Wrench size={48} />
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight">We&apos;ll be right back</h1>
      <h2 className="text-xl font-medium mb-6 text-muted-foreground">Scheduled Maintenance</h2>
      <div className="max-w-md p-6 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl">
        <p className="text-foreground leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
