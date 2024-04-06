import { PrismaClient, User } from '@prisma/client';

async function seed(prisma:PrismaClient) {
  const user_1: User = await prisma.user.upsert({
    where: { auth0Id: 'auth0|123' },
    update: {},
    create: {
      auth0Id: 'auth0|123',
      email: 'user_1@example.com',
      name: 'user_1',
    },
  });

  const user_2: User = await prisma.user.upsert({
    where: { auth0Id: 'auth0|456' },
    update: {},
    create: {
      auth0Id: 'auth0|456',
      email: 'user_2@example.com',
      name: 'user_2',
    },
  });

  const user_3: User = await prisma.user.upsert({
    where: { auth0Id: 'auth0|789' },
    update: {},
    create: {
      auth0Id: 'auth0|789',
      email: 'user_3@example.com',
      name: 'user_3',
    },
  });

  console.info({ user_1, user_2, user_3 });
}

export default seed;
