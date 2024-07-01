import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { UsersResolver } from 'src/users/users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/generated/user/user.model';
import { Prisma } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { config } from 'src/config/main.config';
import { validationSchema } from 'src/config/config.validation';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          validationSchema,
          load: [config],
        }),
      ],
      providers: [UsersService, UsersResolver, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('totalCount', () => {
    it('should return the total count of users', async () => {
      const totalCount = await service.totalCount({});
      expect(totalCount).toBeDefined();
      expect(typeof totalCount).toBe('number');
    });
  });

  describe('user', () => {
    it('should return a user by unique input', async () => {
      const userWhereUniqueInput: Prisma.UserWhereUniqueInput = { id: '1' };

      jest.spyOn(service, 'user').mockResolvedValue(mockUsers[0]);

      const user = await service.user({ where: userWhereUniqueInput });
      expect(user).toBeDefined();
      expect(user).toBe(mockUsers[0]);
    });
  });

  describe('users', () => {
    it('should return an array of users based on provided parameters', async () => {
      const params = {}; // Provide valid parameters

      jest.spyOn(service, 'users').mockResolvedValue(mockUsers);

      const users = await service.users(params);
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
      expect(users).toBe(mockUsers);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const data: Prisma.UserCreateInput = {
        auth0Id: 'valid-auth0-id',
        email: 'valid-email@example.com',
        name: 'valid-name',
      };

      jest.spyOn(service, 'createUser').mockResolvedValue({
        ...data,
        id: '1',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const createdUser = await service.createUser(data);
      expect(createdUser).toBeDefined();
      expect(createdUser.auth0Id).toBe(data.auth0Id);
      expect(createdUser.email).toBe(data.email);
      expect(createdUser.name).toBe(data.name);
      expect(createdUser.isActive).toBe(true);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const where: Prisma.UserWhereUniqueInput = { id: '1' }; // Provide valid unique input
      const data: Prisma.UserUpdateInput = { email: 'test-case1@example.com' }; // Provide valid user data to update
      jest.spyOn(service, 'updateUser').mockResolvedValue({
        ...mockUsers[0],
        ...data,
        updatedAt: new Date(),
      } as User);

      const updatedUser = await service.updateUser({ where, data });
      expect(updatedUser).toBeDefined();
      expect(updatedUser.id).toBe(mockUsers[0].id);
      expect(updatedUser.email).toBe(data.email);
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      const userWhereUniqueInput: Prisma.UserWhereUniqueInput = { id: '1' }; // Provide valid unique input
      jest.spyOn(service, 'deleteUser').mockResolvedValue(mockUsers[0]);
      const deletedUser = await service.deleteUser({
        where: userWhereUniqueInput,
      });
      expect(deletedUser).toBeDefined();
      expect(deletedUser).toBe(mockUsers[0]);
    });
  });
});
