import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'src/config/main.config';
import { validationSchema } from 'src/config/config.validation';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

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
      providers: [AuthService, UsersService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
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
        .spyOn(authService as any, 'fetchUser')
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

      const { user } = await authService.signup(token);
      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('auth0Id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('isActive');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('should return an errorUser with a not active user', async () => {
      const token = 'valid_token';
      const fetchUserSpy = {
        sub: 'auth0|1111e1111',
        name: 'auth_test1',
        email: 'auth_test1@example.com',
      };

      jest
        .spyOn(authService as any, 'fetchUser')
        .mockResolvedValue(fetchUserSpy);

      jest.spyOn(usersService, 'user').mockResolvedValue({
        id: '1',
        auth0Id: fetchUserSpy.sub,
        name: fetchUserSpy.name,
        email: fetchUserSpy.email,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const { user, userErrors } = await authService.signup(token);

      expect(user).toBeNull();
      expect(userErrors).toHaveLength(1);
      expect(userErrors[0].message).toBe('User is not active');
      expect(userErrors[0].field).toBeNull();
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

      jest.spyOn(authService as any, 'verifyJwt').mockResolvedValue({
        sub: mockUser.auth0Id,
      });

      jest.spyOn(usersService, 'user').mockResolvedValue(mockUser);

      const { user } = await authService.signin(token);

      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('isActive');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('should return a userError with a not active user', async () => {
      const token = 'valid_token';

      const mockUser = {
        id: '1',
        auth0Id: 'auth0|111',
        name: 'auth_test1',
        email: '',
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(authService as any, 'verifyJwt').mockResolvedValue({
        sub: mockUser.auth0Id,
      });

      jest.spyOn(usersService, 'user').mockResolvedValue(mockUser);

      const { user, userErrors } = await authService.signin(token);

      expect(user).toBeNull();
      expect(userErrors).toHaveLength(1);
      expect(userErrors[0].message).toBe('User is not active');
      expect(userErrors[0].field).toBeNull();
    });
  });
});
