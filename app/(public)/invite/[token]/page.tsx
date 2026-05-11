import { notFound } from "next/navigation";
import { db } from "@/shared/lib/db";
import { Card } from "@/shared/components/ui/Card";
import { Button } from "@/shared/components/ui/Button";
import { Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { AcceptInviteButton } from "./AcceptInviteButton";

export async function generateMetadata() {
  return {
    title: "Campaign Invitation - PrepIQ",
  };
}

export default async function InvitePage({ params }: { params: { token: string } }) {
  let invite = null;
  
  try {
    invite = await db.campaignInvitation.findUnique({
      where: { token: params.token },
      include: {
        campaign: {
          include: { tests: { include: { test: true } } }
        },
        org: true
      }
    });
  } catch (e) {
    // Mock
    invite = {
      id: "mock-invite",
      token: params.token,
      name: "Alex Candidate",
      email: "candidate@example.com",
      status: "INVITED",
      campaign: {
        name: "Q1 Graduate Assessment",
        endDate: new Date(Date.now() + 86400000 * 7),
        tests: [
          { test: { title: "Numerical Reasoning - Intermediate", totalDurationSecs: 1800 } },
          { test: { title: "Verbal Reasoning - Intermediate", totalDurationSecs: 1800 } }
        ]
      },
      org: {
        name: "Acme Corp",
        primaryColor: "#F97316",
        logoUrl: null
      }
    };
  }

  if (!invite) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--surface-subtle)] p-6">
        <Card className="max-w-md w-full p-8 text-center border-[var(--border)]">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-4">Invalid or Expired Invitation</h1>
          <p className="text-muted-foreground mb-8">
            This invitation link is no longer valid. Please contact the organization that invited you for a new link.
          </p>
        </Card>
      </div>
    );
  }

  const { org, campaign } = invite;
  const isExpired = new Date() > new Date(campaign.endDate) || invite.status === "COMPLETED";

  // Inject Org Branding CSS
  const brandingStyle = {
    "--primary": org.primaryColor,
    // simplistic hex to rgb conversion approximation for ring/alpha
    "--primary-alpha": `${org.primaryColor}20`
  } as React.CSSProperties;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-[var(--surface-subtle)] p-6" style={brandingStyle}>
      <Card className="max-w-xl w-full p-0 overflow-hidden border-[var(--border)] shadow-xl">
        <div 
          className="h-32 bg-primary flex items-center justify-center relative"
          style={{ backgroundColor: org.primaryColor }}
        >
          {org.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={org.logoUrl} alt={org.name} className="h-16 object-contain" />
          ) : (
            <span className="text-3xl font-bold text-white tracking-widest">{org.name.toUpperCase()}</span>
          )}
        </div>
        
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">You&apos;ve been invited!</h1>
            <p className="text-muted-foreground">
              {org.name} has invited you to complete the <strong>{campaign.name}</strong> assessment.
            </p>
          </div>

          <div className="bg-[var(--surface-default)] rounded-xl border border-[var(--border)] p-6 mb-8">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Assessment Details</h3>
            
            <ul className="space-y-4 mb-6">
              {campaign.tests.map((t: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                  <div>
                    <p className="font-medium">{t.test.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock size={14} /> {Math.round(t.test.totalDurationSecs / 60)} minutes
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[var(--border)] flex justify-between text-sm">
              <span className="text-muted-foreground">Total estimated time:</span>
              <span className="font-medium">
                {Math.round(campaign.tests.reduce((acc: number, t: any) => acc + t.test.totalDurationSecs, 0) / 60)} mins
              </span>
            </div>
          </div>

          {isExpired ? (
            <div className="p-4 bg-red-500/10 text-red-600 rounded-lg text-center font-medium">
              This campaign has ended or you have already completed it.
            </div>
          ) : (
            <AcceptInviteButton token={params.token} orgColor={org.primaryColor} />
          )}
        </div>
      </Card>
    </div>
  );
}
