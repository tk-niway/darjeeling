import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { UsersResolver } from 'src/users/users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/generated/user/user.model';
import { Prisma } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { config } from 'src/config/main.config';
import { validationSchema } from 'src/config/config.validation';
import { UtilsService } from 'src/utils/utils.service';
import { OwnVideosDataLoader } from 'src/users/dataloaders/ownVideos.dataloader';
import { InvitedVideosDataLoader } from 'src/users/dataloaders/invitedVideos.dataloader';
import { VideosService } from 'src/videos/videos.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          validationSchema,
          load: [config],
        }),
      ],
      providers: [
        UsersService,
        UsersResolver,
        UtilsService,
        OwnVideosDataLoader,
        InvitedVideosDataLoader,
        VideosService,
        PrismaService,
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockUsers: User[] = [];
  for (let i = 1; i <= 10; i++) {
    const user: User = {
      id: `${i}`,
      name: `User ${i}`,
      auth0Id: '',
      email: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockUsers.push(user);
  }

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('totalCount', () => {
    it('should return the total count of users', async () => {
      jest
        .spyOn(prismaService.user, 'aggregate')
        .mockResolvedValue({ _count: 10 } as any);

      const totalCount = await usersService.totalCount({});

      expect(typeof totalCount).toBe('number');
      expect(totalCount).toBe(10);
    });
  });

  describe('user', () => {
    it('should return a user by unique input', async () => {
      const userWhereUniqueInput: Prisma.UserWhereUniqueInput = { id: '1' };

      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(mockUsers[0]);

      const user = await usersService.user({ where: userWhereUniqueInput });

      expect(user).toBeDefined();
      expect(user).toBe(mockUsers[0]);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockRestore();

      const userWhereUniqueInput: Prisma.UserWhereUniqueInput = {
        id: 'invalid-id',
      };

      const user = await usersService.user({ where: userWhereUniqueInput });
      expect(user).toBeNull();
    });
  });

  describe('users', () => {
    it('should return an array of users based on provided parameters', async () => {
      const params = {}; // Provide valid parameters

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers);

      const users = await usersService.users(params);

      expect(Array.isArray(users)).toBe(true);
      expect(users).toBe(mockUsers);
    });

    it('should return an empty array if no users found', async () => {
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([]);

      const users = await usersService.users({});

      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(0);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const data: Prisma.UserCreateInput = {
        auth0Id: 'valid-auth0-id',
        email: 'valid-email@example.com',
        name: 'valid-name',
      };

      jest.spyOn(prismaService.user, 'upsert').mockResolvedValue({
        ...data,
        id: '1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const createdUser = await usersService.createUser(data);

      expect(createdUser.id).toBe('1');
      expect(createdUser.auth0Id).toBe(data.auth0Id);
      expect(createdUser.email).toBe(data.email);
      expect(createdUser.name).toBe(data.name);
      expect(createdUser.isActive).toBe(true);
    });

    it('should return undefined with empty args', async () => {
      jest.spyOn(prismaService.user, 'upsert').mockReset();

      const data: Prisma.UserCreateInput = {
        auth0Id: '',
        email: '',
        name: '',
      };

      const user = await usersService.createUser(data);

      expect(user).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const where: Prisma.UserWhereUniqueInput = { id: '1' }; // Provide valid unique input

      const data: Prisma.UserUpdateInput = { email: 'test-case1@example.com' }; // Provide valid user data to update

      jest.spyOn(prismaService.user, 'update').mockResolvedValue({
        ...mockUsers[0],
        ...data,
        updatedAt: new Date(),
      } as User);

      const updatedUser = await usersService.updateUser({ where, data });
      expect(updatedUser).toBeDefined();
      expect(updatedUser.id).toBe(mockUsers[0].id);
      expect(updatedUser.email).toBe(data.email);
    });

    it('should return undefined with empty args', async () => {
      jest.spyOn(prismaService.user, 'update').mockReset();

      const where: Prisma.UserWhereUniqueInput = { id: '' };
      const data: Prisma.UserUpdateInput = {};

      const user = await usersService.updateUser({ where, data });

      expect(user).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const userWhereUniqueInput: Prisma.UserWhereUniqueInput = { id: '1' }; // Provide valid unique input

      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(mockUsers[0]);

      const deletedUser = await usersService.deleteUser({
        where: userWhereUniqueInput,
      });

      expect(deletedUser).toBeDefined();
      expect(deletedUser).toBe(mockUsers[0]);
    });

    it('should return undefined with empty args', async () => {
      jest.spyOn(prismaService.user, 'delete').mockReset();

      const userWhereUniqueInput: Prisma.UserWhereUniqueInput = { id: '' };

      const user = await usersService.deleteUser({
        where: userWhereUniqueInput,
      });

      expect(user).toBeUndefined();
    });
  });

  describe('usersWithCount', () => {
    it('should return an array of users with total count', async () => {
      const params = {}; // Provide valid parameters

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers);

      jest
        .spyOn(prismaService.user, 'aggregate')
        .mockResolvedValue({ _count: 10 } as any);

      const usersWithCount = await usersService.usersWithCount(params);

      expect(Array.isArray(usersWithCount.users)).toBe(true);
      expect(usersWithCount.users).toBe(mockUsers);
      expect(usersWithCount.totalCount).toBe(10);
    });

    it('should return an empty array if no users found', async () => {
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue([]);

      jest
        .spyOn(prismaService.user, 'aggregate')
        .mockResolvedValue({ _count: 0 } as any);

      const usersWithCount = await usersService.usersWithCount({});

      expect(Array.isArray(usersWithCount.users)).toBe(true);
      expect(usersWithCount.users).toHaveLength(0);
      expect(usersWithCount.totalCount).toBe(0);
    });
  });
});
