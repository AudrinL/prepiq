import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { FreeTestBanner } from "./FreeTestBanner";
import { 
  Calculator, 
  BookOpen, 
  Shapes, 
  Users, 
  UserCircle, 
  Heart
} from "lucide-react";

export const revalidate = 300;

export const metadata = {
  title: "Browse Tests - PrepIQ",
  description: "Browse our collection of psychometric practice tests.",
};

const CATEGORIES = [
  { id: "NUMERICAL", name: "Numerical Reasoning", icon: Calculator, desc: "Test numerical reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-indigo-500", border: "hover:border-indigo-500", time: "~40 mins" },
  { id: "VERBAL", name: "Verbal Reasoning", icon: BookOpen, desc: "Test verbal reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-purple-500", border: "hover:border-purple-500", time: "~30 mins" },
  { id: "ABSTRACT", name: "Abstract Reasoning", icon: Shapes, desc: "Test abstract reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-cyan-500", border: "hover:border-cyan-500", time: "~40 mins" },
  { id: "SITUATIONAL", name: "Situational Judgment", icon: Users, desc: "Test situational judgment", qCount: 75, diff: "Beginner - Advanced", color: "bg-emerald-500", border: "hover:border-emerald-500", time: "~45 mins" },
  { id: "PERSONALITY", name: "Personality Profile", icon: UserCircle, desc: "Test personality", qCount: 75, diff: "Beginner - Advanced", color: "bg-amber-500", border: "hover:border-amber-500", time: "~30 mins" },
  { id: "EMOTIONAL_INTELLIGENCE", name: "Emotional Intelligence", icon: Heart, desc: "Test emotional intelligence", qCount: 75, diff: "Beginner - Advanced", color: "bg-red-500", border: "hover:border-red-500", time: "~30 mins" },
];

export default function BrowseTestsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <FreeTestBanner />
      
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Browse Tests</h1>
        <p className="text-xl text-muted-foreground">Select a category to start practicing.</p>
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
              <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground flex-wrap">
                <span className="bg-[var(--surface-default)] px-2 py-1 rounded-md">{cat.qCount} Questions</span>
                <span className="bg-[var(--surface-default)] px-2 py-1 rounded-md">{cat.diff}</span>
                <span className="bg-[var(--surface-default)] px-2 py-1 rounded-md">{cat.time}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
