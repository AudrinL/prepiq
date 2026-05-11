"use client";

import * as React from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/shared/components/layout/DashboardShell";
import { MaintenanceBanner } from "@/shared/components/layout/MaintenanceBanner";
import { LayoutDashboard, Compass, LineChart, Trophy, Swords, User } from "lucide-react";

// In a real app we'd use: import { auth } from "@/lib/auth";

export default function IndividualDashboardLayout({ children }: { children: React.ReactNode }) {
  // const session = await auth();
  // if (!session?.user) redirect("/auth/login");
  
  // Mock session for now
  const session = {
    user: { id: "user123", name: "Alex Johnson", email: "user1@prepiq.com", role: "USER" }
  };

  const sidebarItems = [
    { title: "Overview", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { title: "Browse Tests", href: "/dashboard/tests", icon: <Compass size={20} /> },
    { title: "My Progress", href: "/dashboard/progress", icon: <LineChart size={20} /> },
    { title: "Leaderboard", href: "/dashboard/leaderboard", icon: <Trophy size={20} /> },
    { title: "Challenges", href: "/dashboard/challenges", icon: <Swords size={20} /> },
    { title: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MaintenanceBanner />
      <DashboardShell user={session.user} sidebarItems={sidebarItems}>
        {children}
      </DashboardShell>
    </div>
  );
}
