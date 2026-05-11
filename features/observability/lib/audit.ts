import { prisma } from "@/shared/lib/prisma";

export async function logAuditAction({
  actorId,
  actionType,
  entityType,
  entityId,
  diff,
  ipAddress,
  userAgent,
}: {
  actorId: string;
  actionType: string;
  entityType?: string;
  entityId?: string;
  diff?: any;
  ipAddress?: string;
  userAgent?: string;
}) {
  try {
    await prisma.adminActionLog.create({
      data: {
        actorId,
        actionType,
        entityType,
        entityId,
        diff,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    // In production, we don't want audit log failures to crash the main transaction
    // But we should report them to Sentry
    console.error("Failed to write audit log:", error);
  }
}
