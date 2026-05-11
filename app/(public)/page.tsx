import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { 
  Calculator, 
  BookOpen, 
  Shapes, 
  Users, 
  UserCircle, 
  Heart,
  CheckCircle2,
  TrendingUp,
  Star
} from "lucide-react";

export const metadata = {
  title: "PrepIQ - Prepare Smarter. Perform Better.",
  description: "Practice real psychometric tests used by leading employers worldwide.",
};

const CATEGORIES = [
  { id: "NUMERICAL", name: "Numerical Reasoning", icon: Calculator, desc: "Test numerical reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-indigo-500", border: "hover:border-indigo-500" },
  { id: "VERBAL", name: "Verbal Reasoning", icon: BookOpen, desc: "Test verbal reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-purple-500", border: "hover:border-purple-500" },
  { id: "ABSTRACT", name: "Abstract Reasoning", icon: Shapes, desc: "Test abstract reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-cyan-500", border: "hover:border-cyan-500" },
  { id: "SITUATIONAL", name: "Situational Judgment", icon: Users, desc: "Test situational judgment", qCount: 75, diff: "Beginner - Advanced", color: "bg-emerald-500", border: "hover:border-emerald-500" },
  { id: "PERSONALITY", name: "Personality Profile", icon: UserCircle, desc: "Test personality", qCount: 75, diff: "Beginner - Advanced", color: "bg-amber-500", border: "hover:border-amber-500" },
  { id: "EMOTIONAL_INTELLIGENCE", name: "Emotional Intelligence", icon: Heart, desc: "Test emotional intelligence", qCount: 75, diff: "Beginner - Advanced", color: "bg-red-500", border: "hover:border-red-500" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 flex flex-col items-center text-center px-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
        <div className="absolute top-0 w-full h-[500px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6">
          Prepare Smarter.<br/><span className="text-primary">Perform Better.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          Practice real psychometric tests used by leading employers worldwide. Track progress, identify weak areas, and walk into your next assessment with confidence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/tests">
            <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full">
              Start free — no signup needed
            </Button>
          </Link>
          <Link href="/tests">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full">
              Browse all tests
            </Button>
          </Link>
        </div>

        {/* Hero Visual Mockup */}
        <div className="w-full max-w-3xl bg-[var(--surface-elevated)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 relative overflow-hidden backdrop-blur-sm bg-opacity-50">
          <div className="flex items-center justify-between mb-8 border-b border-[var(--border)] pb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="text-indigo-500" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Recent Test</p>
                <p className="font-semibold text-lg">Numerical Reasoning</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="font-bold text-2xl text-emerald-500">84%</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-[var(--surface-default)] rounded-xl border border-[var(--border)] flex items-center justify-center p-4">
                <div className="w-full space-y-2">
                  <div className="h-2 bg-muted rounded-full w-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${Math.random() * 60 + 40}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-sm text-muted-foreground flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" /> Join 50,000+ test-takers preparing with PrepIQ
        </p>
      </section>

      {/* Trust Bar */}
      <section className="py-10 border-y border-[var(--border)] bg-[var(--surface-subtle)]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
          <div className="py-4 md:py-0 text-muted-foreground font-medium">50,000+ tests taken</div>
          <div className="py-4 md:py-0 text-muted-foreground font-medium">500+ organizations trust PrepIQ</div>
          <div className="py-4 md:py-0 text-muted-foreground font-medium flex items-center justify-center gap-2">
            4.8/5 average rating <Star size={16} className="fill-amber-500 text-amber-500" />
          </div>
        </div>
      </section>

      {/* Test Categories */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What would you like to practice?</h2>
          <p className="text-muted-foreground">Select a category to see available practice tests tailored to real assessment standards.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/tests/${cat.id.toLowerCase()}`}>
              <Card className={`p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.border} cursor-pointer group`}>
                <div className={`w-12 h-12 rounded-xl ${cat.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`${cat.color.replace('bg-', 'text-')}`} size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="bg-[var(--surface-default)] px-2 py-1 rounded-md">{cat.qCount} Questions</span>
                  <span className="bg-[var(--surface-default)] px-2 py-1 rounded-md">{cat.diff}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-[var(--surface-subtle)] px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Get started in 3 steps</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -z-10"></div>
            
            {[
              { step: 1, title: "Take a free test", desc: "No signup required to start practicing immediately." },
              { step: 2, title: "See your results", desc: "Get detailed explanations for every single question." },
              { step: 3, title: "Sign up to unlock", desc: "Track your progress and access unlimited tests." },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-background border-4 border-[var(--surface-subtle)] shadow-lg flex items-center justify-center text-xl font-bold text-primary mb-6 relative">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Organizations */}
      <section className="py-24 px-6 bg-slate-900 text-slate-50 dark:bg-black/40">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Assess your candidates at scale</h2>
            <p className="text-slate-400 text-lg mb-8">
              PrepIQ provides enterprise-grade tools for HR teams and recruitment agencies to assess candidate aptitude efficiently.
            </p>
            <ul className="space-y-4 mb-10">
              {["Create custom test campaigns", "Invite candidates via email", "Monitor results in real time", "Export reports for your HR system"].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  {feat}
                </li>
              ))}
            </ul>
            <Link href="/pricing#organizations">
              <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
                See organization plans
              </Button>
            </Link>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
              <h3 className="font-semibold text-lg text-white">Campaign: Engineering Grad 2025</h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/30">Active</span>
            </div>
            <div className="space-y-4">
              {[
                { name: "Sophie Chen", score: "92%", status: "Completed" },
                { name: "James Okafor", score: "88%", status: "Completed" },
                { name: "Alex Johnson", score: "—", status: "Started" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700">
                  <span className="font-medium">{c.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">{c.status}</span>
                    <span className="font-bold w-12 text-right text-indigo-400">{c.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground">Start for free, upgrade when you need more.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <Card className="p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <div className="mb-6"><span className="text-4xl font-bold">$0</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> 3 free tests</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> Basic results</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> No account required</li>
            </ul>
            <Link href="/tests" className="w-full">
              <Button variant="outline" className="w-full">Start Free</Button>
            </Link>
          </Card>
          
          {/* Pro */}
          <Card className="p-8 flex flex-col border-primary relative shadow-lg scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="mb-6"><span className="text-4xl font-bold">$12</span><span className="text-muted-foreground">/mo</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> Unlimited tests</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> Full analytics</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> Adaptive mode</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> Progress tracking</li>
            </ul>
            <Link href="/pricing" className="w-full">
              <Button className="w-full">Get Pro</Button>
            </Link>
          </Card>

          {/* Enterprise */}
          <Card className="p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Organizations</h3>
            <div className="mb-6"><span className="text-4xl font-bold">Custom</span></div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> Unlimited campaigns</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> White-label logo</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> CSV exports</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary"/> API access</li>
            </ul>
            <Link href="/auth/org-signup" className="w-full">
              <Button variant="outline" className="w-full">Contact Us</Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
