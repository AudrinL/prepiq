"use client";

import * as React from "react"
import { cn } from "@/shared/lib/utils"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  user?: any;
  sidebarItems?: any[];
}

export function DashboardShell({
  children,
  user,
  sidebarItems = [],
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 mx-auto px-4 md:px-8">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-[var(--surface-elevated)] md:sticky md:block py-6 pr-6">
          <Sidebar items={sidebarItems} />
        </aside>
        <main
          className={cn("flex w-full flex-col overflow-hidden py-6", className)}
          {...props}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
