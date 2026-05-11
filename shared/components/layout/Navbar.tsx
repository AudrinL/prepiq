"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/shared/components/ui/Button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  user?: any;
  isPublic?: boolean;
}

export function Navbar({ user, isPublic = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--surface-elevated)] bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 container mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl tracking-tight text-primary">PrepIQ</span>
          </Link>
          
          {isPublic && (
            <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground ml-6">
              <Link href="/tests" className="hover:text-primary transition-colors">Tests</Link>
              <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {isPublic ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/pricing">
                <Button variant="outline" size="sm">For organizations</Button>
              </Link>
              <Link href="/tests">
                <Button size="sm">Start free test</Button>
              </Link>
            </div>
          ) : (
            user && <span className="text-sm font-medium">{user.name}</span>
          )}

          {isPublic && (
            <button
              className="md:hidden flex items-center justify-center p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {isPublic && mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--surface-elevated)] bg-background">
          <nav className="flex flex-col space-y-4 p-6">
            <Link href="/tests" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Tests</Link>
            <Link href="/pricing" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/blog" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/about" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-[var(--surface-elevated)]">
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">For organizations</Button>
              </Link>
              <Link href="/tests" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Start free test</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
