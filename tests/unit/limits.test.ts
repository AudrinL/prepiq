import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkOrgLimits } from '@/features/organizations/lib/limits';
import { prisma } from '@/shared/lib/prisma';

// Mock prisma
vi.mock('@/shared/lib/prisma', () => ({
  prisma: {
    organization: {
      findUnique: vi.fn(),
    },
  },
}));

describe('checkOrgLimits', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return allowed: true if under limit and active', async () => {
    (prisma.organization.findUnique as any).mockResolvedValue({
      id: 'org-1',
      status: 'ACTIVE',
      seatsLimit: 50,
      _count: { members: 10 },
    });

    const result = await checkOrgLimits('org-1');
    expect(result.allowed).toBe(true);
  });

  it('should return allowed: false if over limit', async () => {
    (prisma.organization.findUnique as any).mockResolvedValue({
      id: 'org-1',
      status: 'ACTIVE',
      seatsLimit: 50,
      _count: { members: 50 },
    });

    const result = await checkOrgLimits('org-1');
    expect(result.allowed).toBe(false);
    expect(result.message).toContain('Seat limit reached');
  });

  it('should return allowed: false if not active', async () => {
    (prisma.organization.findUnique as any).mockResolvedValue({
      id: 'org-1',
      status: 'SUSPENDED',
      seatsLimit: 50,
      _count: { members: 10 },
    });

    const result = await checkOrgLimits('org-1');
    expect(result.allowed).toBe(false);
    expect(result.message).toContain('not active');
  });
});
