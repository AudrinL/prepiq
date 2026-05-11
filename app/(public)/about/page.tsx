import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
import { Target, Shield, Users, Lightbulb, Globe, Heart } from "lucide-react";

export const metadata = {
  title: "About PrepIQ - Our Mission",
  description: "Learn about PrepIQ's mission to democratize psychometric test preparation and help candidates and organizations succeed.",
};

const values = [
  {
    icon: Target,
    title: "Science-Driven",
    description: "Every question is crafted by I/O psychologists and validated through rigorous psychometric analysis to ensure accuracy and fairness.",
  },
  {
    icon: Shield,
    title: "Fair & Unbiased",
    description: "We continuously audit our assessments for adverse impact and cultural bias, ensuring equitable outcomes for all candidates.",
  },
  {
    icon: Users,
    title: "People-First",
    description: "We believe assessments should empower candidates, not gatekeep. Our platform helps people discover and develop their strengths.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description: "Our adaptive algorithms and AI-powered analytics evolve with the latest research in cognitive science and psychometrics.",
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Available in multiple languages with culturally adapted content, making world-class preparation accessible to everyone.",
  },
  {
    icon: Heart,
    title: "Candidate Wellbeing",
    description: "We provide stress-reduction tools, realistic practice environments, and supportive guidance to reduce test anxiety.",
  },
];

const stats = [
  { value: "2M+", label: "Tests Completed" },
  { value: "500+", label: "Organizations" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "45+", label: "Countries" },
];

const team = [
  { name: "Dr. Sarah Chen", role: "CEO & Co-Founder", bio: "Former Head of Assessment at Deloitte with 15 years in psychometric research." },
  { name: "James Okafor", role: "CTO & Co-Founder", bio: "Ex-Google engineer specializing in adaptive testing algorithms and real-time systems." },
  { name: "Dr. Maria Santos", role: "Chief Science Officer", bio: "Published researcher in I/O psychology with expertise in cognitive ability testing." },
  { name: "Alex Müller", role: "VP of Product", bio: "Previously led product at Assessment.com, passionate about candidate experience." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-hue),80%,95%)] via-background to-[hsl(var(--brand-hue),60%,92%)] dark:from-[hsl(var(--brand-hue),60%,8%)] dark:via-background dark:to-[hsl(var(--brand-hue),40%,6%)]" />
        <div className="container relative mx-auto px-6 text-center">
          <span className="inline-block rounded-full bg-[hsl(var(--brand-hue),70%,90%)] dark:bg-[hsl(var(--brand-hue),50%,18%)] px-4 py-1.5 text-sm font-medium text-[hsl(var(--brand-hue),70%,40%)] dark:text-[hsl(var(--brand-hue),70%,70%)] mb-6">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
            Making Assessment{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--brand-hue),70%,50%)] to-[hsl(var(--brand-hue),90%,45%)] bg-clip-text text-transparent">
              Fairer
            </span>{" "}
            for Everyone
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            PrepIQ was founded on the belief that every candidate deserves an equal opportunity
            to showcase their true potential, and every organization deserves reliable, unbiased insights.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[var(--surface-elevated)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--brand-hue),70%,50%)] to-[hsl(var(--brand-hue),90%,45%)] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Traditional psychometric testing has long been a black box — expensive to access,
                anxiety-inducing for candidates, and often built on outdated methodologies.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                PrepIQ changes that. We combine cutting-edge adaptive testing technology with
                evidence-based preparation tools to level the playing field. For candidates,
                we demystify the assessment process. For organizations, we deliver more
                accurate, fair, and actionable insights.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every feature we build is guided by one question:{" "}
                <em className="text-foreground font-medium">
                  &ldquo;Does this help people show their true potential?&rdquo;
                </em>
              </p>
            </div>
            <Card className="p-8 bg-gradient-to-br from-[hsl(var(--brand-hue),70%,97%)] to-[hsl(var(--brand-hue),50%,94%)] dark:from-[hsl(var(--brand-hue),50%,10%)] dark:to-[hsl(var(--brand-hue),30%,6%)] border-[hsl(var(--brand-hue),50%,80%)] dark:border-[hsl(var(--brand-hue),40%,20%)]">
              <blockquote className="text-xl font-medium leading-relaxed mb-4">
                &ldquo;We envision a world where assessments empower rather than exclude — where
                every person can prepare confidently and every organization can hire fairly.&rdquo;
              </blockquote>
              <cite className="text-sm text-muted-foreground not-italic">
                — Dr. Sarah Chen, CEO &amp; Co-Founder
              </cite>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--surface-elevated)]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These principles guide every decision we make, from product design to partnerships.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="p-6 hover:shadow-lg transition-shadow">
                <value.icon className="h-10 w-10 text-[hsl(var(--brand-hue),70%,50%)] mb-4" />
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A multidisciplinary team of psychometricians, engineers, and product leaders.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--brand-hue),60%,60%)] to-[hsl(var(--brand-hue),80%,45%)] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-[hsl(var(--brand-hue),70%,50%)] mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[hsl(var(--brand-hue),70%,50%)] to-[hsl(var(--brand-hue),90%,45%)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            Join thousands of candidates and organizations already using PrepIQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button className="bg-white text-[hsl(var(--brand-hue),70%,40%)] hover:bg-white/90 px-8 py-3 font-semibold">
                Start Free
              </Button>
            </Link>
            <Link href="/auth/org-signup">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 font-semibold">
                For Organizations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
