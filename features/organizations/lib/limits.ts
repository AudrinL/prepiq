import { prisma } from "@/shared/lib/prisma";

export async function checkOrgLimits(orgId: string): Promise<{ allowed: boolean; message?: string }> {
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    include: { _count: { select: { members: true } } },
  });

  if (!org) {
    return { allowed: false, message: "Organization not found" };
  }

  if (org.status !== "ACTIVE") {
    return { allowed: false, message: "Organization is not active" };
  }

  if (org._count.members >= org.seatsLimit) {
    return { allowed: false, message: "Seat limit reached. Please upgrade your plan." };
  }

  return { allowed: true };
}
