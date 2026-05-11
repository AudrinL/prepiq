"use client";

import * as React from "react";
import { DashboardShell } from "@/shared/components/layout/DashboardShell";
import {
  LayoutDashboard,
  Users,
  FileQuestion,
  ClipboardList,
  Activity,
  FileBarChart,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
  { title: "Users", href: "/admin/users", icon: <Users size={20} /> },
  { title: "Questions", href: "/admin/questions", icon: <FileQuestion size={20} /> },
  { title: "Tests", href: "/admin/tests", icon: <ClipboardList size={20} /> },
  { title: "Events", href: "/admin/events", icon: <Activity size={20} /> },
  { title: "Reports", href: "/admin/reports", icon: <FileBarChart size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      user={{ name: "Admin User", email: "admin@prepiq.com", role: "ADMIN" }}
      sidebarItems={sidebarItems}
    >
      {children}
    </DashboardShell>
  );
}
