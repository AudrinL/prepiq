"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("grid items-start gap-2", className)}
      {...props}
    >
      {items.map((item, index) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={index}
            href={item.href}
          >
            <span
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground font-semibold"
              )}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
