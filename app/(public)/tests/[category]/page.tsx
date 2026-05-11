import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { db } from "@/shared/lib/db";
import { DifficultyLevel, TestCategorySlug } from "@prisma/client";
import { SignInModal } from "./SignInModal";
import { Calculator, BookOpen, Shapes, Users, UserCircle, Heart, Clock, HelpCircle, ChevronRight } from "lucide-react";

export const revalidate = 300;

const ICONS = {
  NUMERICAL: Calculator,
  VERBAL: BookOpen,
  ABSTRACT: Shapes,
  SITUATIONAL: Users,
  PERSONALITY: UserCircle,
  EMOTIONAL_INTELLIGENCE: Heart,
};

export async function generateMetadata({ params }: { params: { category: string } }) {
  return {
    title: `${params.category.toUpperCase()} Tests - PrepIQ`,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const slugUpper = params.category.toUpperCase() as TestCategorySlug;
  
  if (!Object.values(TestCategorySlug).includes(slugUpper)) {
    notFound();
  }

  // Fetch tests from DB
  let categoryData = null;
  let tests = [];
  try {
    categoryData = await db.testCategory.findUnique({
      where: { slug: slugUpper },
      include: {
        tests: {
          where: { isActive: true },
          include: {
            _count: { select: { questions: true } }
          }
        }
      }
    });
    tests = categoryData?.tests || [];
  } catch (e) {
    // Fallback if DB is not connected yet during build
    tests = [
      { id: "mock-1", title: `${slugUpper} - Beginner`, level: DifficultyLevel.BEGINNER, _count: { questions: 20 }, totalDurationSecs: 1200 },
      { id: "mock-2", title: `${slugUpper} - Intermediate`, level: DifficultyLevel.INTERMEDIATE, _count: { questions: 25 }, totalDurationSecs: 1800 },
      { id: "mock-3", title: `${slugUpper} - Advanced`, level: DifficultyLevel.ADVANCED, _count: { questions: 30 }, totalDurationSecs: 2400 },
    ];
    categoryData = {
      label: slugUpper.replace("_", " "),
      description: "Practice tests for this category",
      iconName: "book",
      color: "#6366F1"
    };
  }

  if (!categoryData) {
    notFound();
  }

  const Icon = ICONS[slugUpper as keyof typeof ICONS] || BookOpen;

  const grouped = {
    [DifficultyLevel.BEGINNER]: tests.filter(t => t.level === DifficultyLevel.BEGINNER),
    [DifficultyLevel.INTERMEDIATE]: tests.filter(t => t.level === DifficultyLevel.INTERMEDIATE),
    [DifficultyLevel.ADVANCED]: tests.filter(t => t.level === DifficultyLevel.ADVANCED),
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link href="/tests" className="hover:text-primary">Tests</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-foreground font-medium">{categoryData.label}</span>
      </div>

      {/* Category Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-primary/10">
          <Icon className="text-primary" size={40} />
        </div>
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">{categoryData.label}</h1>
          <p className="text-xl text-muted-foreground">{categoryData.description}</p>
        </div>
      </div>

      {/* Tests Grouped by Level */}
      <div className="space-y-16">
        {Object.entries(grouped).map(([level, levelTests]) => {
          if (levelTests.length === 0) return null;
          return (
            <div key={level}>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
                {level}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelTests.map((test: any) => (
                  <Card key={test.id} className="p-6 flex flex-col">
                    <h3 className="text-xl font-semibold mb-4">{test.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="flex items-center text-sm text-muted-foreground bg-[var(--surface-subtle)] px-3 py-1.5 rounded-md">
                        <HelpCircle size={16} className="mr-2 text-primary" />
                        {test._count?.questions || test.minQuestions} Questions
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground bg-[var(--surface-subtle)] px-3 py-1.5 rounded-md">
                        <Clock size={16} className="mr-2 text-primary" />
                        {Math.round(test.totalDurationSecs / 60)} Mins
                      </div>
                    </div>
                    <div className="mt-auto pt-6 border-t border-[var(--border)]">
                      <SignInModal 
                        testId={test.id} 
                        category={params.category} 
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
