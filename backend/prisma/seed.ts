import { PrismaClient } from '@prisma/client';
import seed_users from './seeds/user.seed';

const prisma = new PrismaClient();

const main = async () => {
  await seed_users(prisma);
};

main()
  .then(async () => {
    console.info('Seed completed');
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
