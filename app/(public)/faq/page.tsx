"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { ChevronDown, Search, MessageCircle } from "lucide-react";

const categories = [
  { id: "general", label: "General" },
  { id: "individual", label: "For Individuals" },
  { id: "organization", label: "For Organizations" },
  { id: "billing", label: "Billing" },
];

const faqs: Record<string, { q: string; a: string }[]> = {
  general: [
    { q: "What is PrepIQ?", a: "PrepIQ is a psychometric test preparation platform helping candidates practice cognitive ability tests, personality assessments, and SJTs. Organizations use it for assessment campaigns." },
    { q: "What types of tests are available?", a: "We offer Numerical Reasoning, Verbal Reasoning, Abstract Reasoning, SJT, Personality Assessments, and Emotional Intelligence evaluations across multiple difficulty levels." },
    { q: "Are tests scientifically validated?", a: "Yes. All assessments are developed by I/O psychologists and undergo reliability analysis, construct validity testing, and adverse impact studies following BPS and ITC guidelines." },
    { q: "Can I try before signing up?", a: "Guest users can take up to 3 free tests without an account. After that, sign up for free with limited monthly tests, or go premium for unlimited access." },
  ],
  individual: [
    { q: "How does adaptive difficulty work?", a: "Our engine adjusts question difficulty in real-time. Correct answers increase difficulty; struggles decrease it. This gives a more accurate picture of your true ability." },
    { q: "Can I track my progress?", a: "Yes. Your dashboard shows performance trends, percentile rankings, and complete attempt history across all categories." },
    { q: "What is the Leaderboard?", a: "It ranks users by composite scores. Filter by category or time period to benchmark your performance against others." },
    { q: "Can I challenge other users?", a: "Yes. Create or join head-to-head or group challenges. Pick a category, set a time limit, and compete." },
  ],
  organization: [
    { q: "What is a Campaign?", a: "A structured assessment program for candidates. Select tests, set deadlines, invite participants by email, and track completion and scores with analytics." },
    { q: "Can I white-label the platform?", a: "On Business and Enterprise plans you can customize logos, brand colors, custom domains, and email templates." },
    { q: "How do I invite candidates?", a: "Upload a CSV, enter emails manually, or share a unique invite link. Each candidate receives a personalized invitation." },
    { q: "What analytics are available?", a: "Dashboards include score distributions, completion rates, time metrics, comparisons, and exportable PDF/CSV reports." },
  ],
  billing: [
    { q: "What plans are available?", a: "Free (3 tests/month), Pro ($19/month unlimited), Organization ($99/month+), and custom Enterprise pricing. All paid plans include a 14-day trial." },
    { q: "Can I cancel anytime?", a: "Yes. Cancel from account settings. Access continues until the end of your billing period with no cancellation fees." },
    { q: "Educational discounts?", a: "Yes. Special pricing for universities and career services. Contact edu@prepiq.com." },
    { q: "Payment methods?", a: "Visa, Mastercard, Amex, PayPal, and bank transfers for Enterprise. All processed securely via Stripe." },
  ],
};

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--surface-elevated)] last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-5 text-left hover:text-[hsl(var(--brand-hue),70%,50%)] transition-colors">
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [search, setSearch] = useState("");

  const filtered = search
    ? Object.values(faqs).flat().filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs[activeCategory] || [];

  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 bg-gradient-to-b from-[hsl(var(--brand-hue),80%,96%)] to-background dark:from-[hsl(var(--brand-hue),60%,8%)] dark:to-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">Find answers to common questions about PrepIQ.</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input type="text" placeholder="Search questions..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-[var(--surface-elevated)] bg-background pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-hue),70%,50%)]" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {!search && (
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? "bg-[hsl(var(--brand-hue),70%,50%)] text-white shadow-md" : "bg-[var(--surface-elevated)] text-muted-foreground hover:text-foreground"}`}>
                  {cat.label}
                </button>
              ))}
            </div>
          )}
          {search && <p className="text-sm text-muted-foreground mb-6">{filtered.length} result{filtered.length !== 1 ? "s" : ""} found</p>}
          <Card className="p-6 md:p-8">
            {filtered.length > 0 ? filtered.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No matching questions found.</p>
                <Button variant="outline" onClick={() => setSearch("")}>Clear Search</Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      <section className="py-16 bg-[var(--surface-elevated)]">
        <div className="container mx-auto px-6 text-center">
          <MessageCircle className="h-12 w-12 text-[hsl(var(--brand-hue),70%,50%)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">Our support team is here to help.</p>
          <Link href="mailto:support@prepiq.com"><Button className="px-8 py-3">Contact Support</Button></Link>
        </div>
      </section>
    </div>
  );
}
