import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { FileQuestion } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-muted text-muted-foreground rounded-full flex items-center justify-center mb-8">
        <FileQuestion size={40} />
      </div>
      <h1 className="text-6xl font-bold mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg">Return Home</Button>
      </Link>
    </div>
  );
}
