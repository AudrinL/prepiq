import * as React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--surface-elevated)] bg-background py-12 md:py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl tracking-tight text-primary">PrepIQ</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-4">
            Prepare smarter. Perform better. Practice real psychometric tests used by leading employers worldwide.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/tests" className="hover:text-primary transition-colors">Browse Tests</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/auth/org-signup" className="hover:text-primary transition-colors">For Organizations</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-8 mt-8 border-t border-[var(--surface-elevated)] flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} PrepIQ. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <span>Powered by PrepIQ</span>
        </div>
      </div>
    </footer>
  );
}
