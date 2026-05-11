import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-8">
        <Lock size={40} />
      </div>
      <h1 className="text-6xl font-bold mb-4 tracking-tighter">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        You don&apos;t have permission to view this page. If you believe this is a mistake, please contact support.
      </p>
      <Link href="/">
        <Button size="lg">Return Home</Button>
      </Link>
    </div>
  );
}
