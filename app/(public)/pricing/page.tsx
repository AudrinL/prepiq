import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Pricing - PrepIQ",
  description: "Simple, transparent pricing for individuals and organizations.",
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing</h1>
        <p className="text-xl text-muted-foreground">
          Whether you&apos;re practicing for your next interview or assessing thousands of candidates, we have a plan for you.
        </p>
      </div>

      {/* Individual Plans */}
      <div className="mb-24">
        <h2 className="text-2xl font-bold mb-8 text-center">For Individuals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free */}
          <Card className="p-8 flex flex-col hover:shadow-xl transition-shadow border-[var(--border)]">
            <h3 className="text-2xl font-semibold mb-2">Free</h3>
            <p className="text-muted-foreground mb-6">Perfect to try things out.</p>
            <div className="mb-8"><span className="text-5xl font-bold">$0</span></div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> 3 free tests</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> Basic results</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> No account required</li>
            </ul>
            <Link href="/tests" className="w-full">
              <Button variant="outline" size="lg" className="w-full">Start Free</Button>
            </Link>
          </Card>

          {/* Pro */}
          <Card className="p-8 flex flex-col relative border-primary shadow-2xl scale-100 md:scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-muted-foreground mb-6">Everything you need to ace your assessment.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold">$12</span><span className="text-muted-foreground">/mo</span>
              <p className="text-xs text-muted-foreground mt-2 font-medium">Billed annually ($144/yr). Save 31%.</p>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> Unlimited tests</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> Full analytics & breakdown</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> Adaptive mode</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> Progress tracking</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary"/> Group challenges & Leaderboard</li>
            </ul>
            <Link href="/auth/signup" className="w-full">
              <Button size="lg" className="w-full">Get Pro</Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Organization Plans */}
      <div id="organizations" className="mb-24 pt-12 border-t border-[var(--border)]">
        <h2 className="text-2xl font-bold mb-8 text-center">For Organizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter */}
          <Card className="p-8 flex flex-col border-[var(--border)]">
            <h3 className="text-xl font-semibold mb-2">Starter</h3>
            <div className="mb-6"><span className="text-4xl font-bold">$0</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> 1 active campaign</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> 10 participants</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Basic results</li>
            </ul>
            <Link href="/auth/org-signup" className="w-full">
              <Button variant="outline" className="w-full">Start Free</Button>
            </Link>
          </Card>
          
          {/* Pro Org */}
          <Card className="p-8 flex flex-col border-[var(--border)] hover:border-primary transition-colors">
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="mb-6"><span className="text-4xl font-bold">$49</span><span className="text-muted-foreground">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Unlimited campaigns</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> 100 participants/month</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> White-label logo</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> CSV exports</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Candidate management</li>
            </ul>
            <Link href="/auth/org-signup" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </Card>

          {/* Enterprise */}
          <Card className="p-8 flex flex-col border-[var(--border)] bg-[var(--surface-subtle)]">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <div className="mb-6"><span className="text-4xl font-bold">Contact us</span></div>
            <ul className="space-y-4 mb-8 flex-1 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Unlimited everything</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Custom white-label colors</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> API access</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Dedicated support SLA</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500"/> Custom contracts</li>
            </ul>
            <Link href="/contact" className="w-full">
              <Button variant="secondary" className="w-full">Contact Sales</Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your subscription at any time. If you cancel, you will continue to have access to your plan features until the end of your billing period." },
            { q: "What happens when I run out of my 3 free tests?", a: "Once you complete 3 tests, you'll need to upgrade to a Pro plan to continue taking tests. However, you will always have access to the results of your past tests." },
            { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for all annual subscriptions if you haven't taken more than 5 tests during that period." },
            { q: "Can my organization buy more participants later?", a: "Yes, organizations on the Pro plan can purchase additional participant add-ons seamlessly from the dashboard." },
            { q: "How does the enterprise white-labeling work?", a: "Enterprise customers can replace the PrepIQ logo and match the dashboard colors to their brand, providing a completely native experience for candidates." },
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-default)]">
              <h4 className="font-semibold text-lg mb-2">{faq.q}</h4>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
