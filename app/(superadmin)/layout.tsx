"use client";

import * as React from "react";
import { DashboardShell } from "@/shared/components/layout/DashboardShell";
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  ScrollText,
  CreditCard,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", href: "/superadmin", icon: <LayoutDashboard size={20} /> },
  { title: "Organizations", href: "/superadmin/organizations", icon: <Building2 size={20} /> },
  { title: "Admins", href: "/superadmin/admins", icon: <ShieldCheck size={20} /> },
  { title: "Audit Log", href: "/superadmin/audit", icon: <ScrollText size={20} /> },
  { title: "Billing", href: "/superadmin/billing", icon: <CreditCard size={20} /> },
  { title: "Settings", href: "/superadmin/settings", icon: <Settings size={20} /> },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  // In production: check session for SUPER_ADMIN role
  // const session = await getServerSession(authOptions);
  // if (!session || session.user.globalRole !== "SUPER_ADMIN") redirect("/403");

  return (
    <DashboardShell
      user={{ name: "Super Admin", email: "admin@prepiq.com", role: "SUPER_ADMIN" }}
      sidebarItems={sidebarItems}
    >
      {children}
    </DashboardShell>
  );
}
