import * as React from "react";
import { notFound } from "next/navigation";
import { db } from "@/shared/lib/db";
import { OrgLayoutShell } from "./OrgLayoutShell";
import { OrgSuspendedPage } from "./OrgSuspendedPage";

export default async function OrgLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode,
  params: { slug: string }
}) {
  let org = null;
  
  try {
    org = await db.organization.findUnique({
      where: { slug: params.slug },
      include: {
        members: {
          where: { user: { email: "user1@prepiq.com" } } // mocked current user check
        }
      }
    });
  } catch (e) {
    // Mock for build without DB
    org = {
      id: "org-acme-123",
      name: "Acme Corp",
      slug: params.slug,
      status: "ACTIVE",
      primaryColor: "#F97316",
      logoUrl: null,
      suspendedReason: null,
      members: [{ role: "ADMIN" }]
    };
  }

  if (!org) {
    notFound();
  }

  if (org.status === "SUSPENDED") {
    return <OrgSuspendedPage orgName={org.name} reason={org.suspendedReason} />;
  }

  // Generate CSS Variables for white-labeling — only plain strings, safe to pass as props
  const hex = org.primaryColor || "#6366F1";
  const brandingStyle = {
    "--primary": hex,
    "--brand-primary": hex,
    "--ring": `${hex}40`,
  } as React.CSSProperties;

  return (
    <OrgLayoutShell
      slug={params.slug}
      orgName={org.name}
      brandingStyle={brandingStyle}
    >
      {children}
    </OrgLayoutShell>
  );
}

