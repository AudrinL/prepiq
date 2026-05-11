import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding test database...');
  await prisma.platformSettings.create({
    data: {
      platformName: 'PrepIQ Test',
    },
  });
  console.log('Test Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
