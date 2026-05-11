import { AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

interface OrgSuspendedPageProps {
  orgName: string;
  reason?: string | null;
}

export function OrgSuspendedPage({ orgName, reason }: OrgSuspendedPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center">
      <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-8">
        <AlertCircle size={48} />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">Organization Suspended</h1>
      <h2 className="text-xl font-medium mb-8 text-muted-foreground">Access for {orgName} has been restricted.</h2>
      
      {reason && (
        <div className="max-w-md w-full p-6 bg-red-500/5 border border-red-500/20 rounded-xl mb-8">
          <p className="font-medium text-red-600 dark:text-red-400 mb-2">Reason for suspension:</p>
          <p className="text-sm text-foreground">{reason}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">Contact PrepIQ Support</Button>
        <Button variant="outline" size="lg">Sign Out</Button>
      </div>
    </div>
  );
}
