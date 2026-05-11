"use client";

import * as React from "react";
import { DashboardShell } from "@/shared/components/layout/DashboardShell";
import { LayoutDashboard, Megaphone, Users, BarChart3, Settings, FileText } from "lucide-react";

interface OrgLayoutShellProps {
  children: React.ReactNode;
  slug: string;
  orgName: string;
  brandingStyle: React.CSSProperties;
}

export function OrgLayoutShell({ children, slug, orgName, brandingStyle }: OrgLayoutShellProps) {
  const sidebarItems = [
    { title: "Overview", href: `/org/${slug}`, icon: <LayoutDashboard size={20} /> },
    { title: "Campaigns", href: `/org/${slug}/campaigns`, icon: <Megaphone size={20} /> },
    { title: "Results", href: `/org/${slug}/results`, icon: <BarChart3 size={20} /> },
    { title: "Team", href: `/org/${slug}/members`, icon: <Users size={20} /> },
    { title: "Reports", href: `/org/${slug}/reports`, icon: <FileText size={20} /> },
    { title: "Settings", href: `/org/${slug}/settings`, icon: <Settings size={20} /> },
  ];

  return (
    <div style={brandingStyle} className="org-theme-provider min-h-screen flex flex-col bg-background">
      <DashboardShell 
        user={{ name: orgName }}
        sidebarItems={sidebarItems}
      >
        {children}
      </DashboardShell>
    </div>
  );
}
