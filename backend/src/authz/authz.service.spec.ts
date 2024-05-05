import { Test, TestingModule } from '@nestjs/testing';
import { AuthzService } from './authz.service';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

describe('AuthzService', () => {
  let authzService: AuthzService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthzService, UsersService, ConfigService, PrismaService],
    }).compile();

    authzService = module.get<AuthzService>(AuthzService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authzService).toBeDefined();
  });

  describe('signup', () => {
    it('should return a User object when a valid token is provided', async () => {
      const token = 'valid_token';
      const fetchUserSpy = {
        sub: 'auth0|1111e1111',
        name: 'auth_test1',
        email: 'auth_test1@example.com',
      };

      jest
        .spyOn(authzService as any, 'fetchUser')
        .mockResolvedValue(fetchUserSpy);

      jest.spyOn(usersService, 'createUser').mockResolvedValue({
        id: '1',
        auth0Id: fetchUserSpy.sub,
        name: fetchUserSpy.name,
        email: fetchUserSpy.email,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const user = await authzService.signup(token);
      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('auth0Id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('isActive');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('should throw an error when an invalid token is provided', async () => {
      const token = 'invalid_token';
      jest
      .spyOn(authzService as any, 'fetchUser')
      .mockResolvedValue(
        undefined,
      );

      await expect(authzService.signup(token)).rejects.toThrowError();
    });
  });

  describe('signin', () => {
    it('should return a User object when a valid token is provided', async () => {
      const token = 'valid_token';
      const mockUser = {
        id: '1',
        auth0Id: 'auth0|111',
        name: 'auth_test1',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(authzService as any, 'verifyJwt').mockResolvedValue({
        sub: mockUser.auth0Id,
      });

      jest.spyOn(usersService, 'user').mockResolvedValue(mockUser);

      const user = await authzService.signin(token);

      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('isActive');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('should throw an error when an invalid token is provided', async () => {
      const token = 'invalid_token';
      
      jest.spyOn(authzService as any, 'verifyJwt').mockResolvedValue(undefined);

      await expect(authzService.signin(token)).rejects.toThrowError(
        'Invalid token [object Object]',
      );
    });
  });
});
