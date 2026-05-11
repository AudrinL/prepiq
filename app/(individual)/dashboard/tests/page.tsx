import Link from "next/link";
import { Card } from "@/shared/components/ui/Card";
import { 
  Calculator, 
  BookOpen, 
  Shapes, 
  Users, 
  UserCircle, 
  Heart,
  CheckCircle2
} from "lucide-react";

export const metadata = {
  title: "Browse Tests - Dashboard",
};

const CATEGORIES = [
  { id: "NUMERICAL", name: "Numerical Reasoning", icon: Calculator, desc: "Test numerical reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-indigo-500", border: "hover:border-indigo-500", time: "~40 mins", completed: true, bestScore: 84 },
  { id: "VERBAL", name: "Verbal Reasoning", icon: BookOpen, desc: "Test verbal reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-purple-500", border: "hover:border-purple-500", time: "~30 mins", completed: true, bestScore: 72 },
  { id: "ABSTRACT", name: "Abstract Reasoning", icon: Shapes, desc: "Test abstract reasoning", qCount: 75, diff: "Beginner - Advanced", color: "bg-cyan-500", border: "hover:border-cyan-500", time: "~40 mins", completed: false, bestScore: null },
  { id: "SITUATIONAL", name: "Situational Judgment", icon: Users, desc: "Test situational judgment", qCount: 75, diff: "Beginner - Advanced", color: "bg-emerald-500", border: "hover:border-emerald-500", time: "~45 mins", completed: true, bestScore: 90 },
  { id: "PERSONALITY", name: "Personality Profile", icon: UserCircle, desc: "Test personality", qCount: 75, diff: "Beginner - Advanced", color: "bg-amber-500", border: "hover:border-amber-500", time: "~30 mins", completed: false, bestScore: null },
  { id: "EMOTIONAL_INTELLIGENCE", name: "Emotional Intelligence", icon: Heart, desc: "Test emotional intelligence", qCount: 75, diff: "Beginner - Advanced", color: "bg-red-500", border: "hover:border-red-500", time: "~30 mins", completed: false, bestScore: null },
];

export default function DashboardTestsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Tests</h1>
        <p className="text-muted-foreground">Select a category to start practicing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Link key={cat.id} href={`/tests/${cat.id.toLowerCase()}`}>
            <Card className={`p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.border} cursor-pointer group relative overflow-hidden`}>
              {cat.completed && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                  <CheckCircle2 size={14} /> Completed
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-xl ${cat.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon className={`${cat.color.replace('bg-', 'text-')}`} size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
              
              {cat.bestScore && (
                <div className="mb-4">
                  <span className="text-xs text-muted-foreground font-medium">Best Score: </span>
                  <span className="text-sm font-bold text-primary">{cat.bestScore}%</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground flex-wrap">
                <span className="bg-[var(--surface-default)] px-2 py-1 rounded-md">{cat.qCount} Qs</span>
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
