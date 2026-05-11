import { describe, it, expect } from 'vitest';
import { PrismaClient } from '@prisma/client';

describe('Prisma Schema', () => {
  it('should instantiate PrismaClient', () => {
    const prisma = new PrismaClient();
    expect(prisma).toBeDefined();
  });
});
