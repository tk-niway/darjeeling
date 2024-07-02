import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from 'src/auth/auth.resolver';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from 'src/config/config.validation';
import { config } from 'src/config/main.config';

describe('AuthResolver', () => {
  let resolver: AuthResolver;

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
      providers: [
        AuthResolver,
        AuthService,
        JwtStrategy,
        PrismaService,
        UsersService,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signup', () => {
    it('should return a user after signup', async () => {
      const token = 'token';
      jest.spyOn(resolver, 'signup').mockResolvedValue({
        user: {
          id: '1',
          name: 'User 1',
          auth0Id: 'auth0Id',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        userErrors: [],
      });

      const { user } = await resolver.signup(token);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.auth0Id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.isActive).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should return userErrors if signup fails', async () => {
      const token = 'token';
      jest.spyOn(resolver, 'signup').mockResolvedValue({
        user: null,
        userErrors: [
          {
            field: 'email',
            message: 'Email is required',
          },
          {
            field: 'password',
            message: 'Password is required',
          },
        ],
      });
      const { user, userErrors } = await resolver.signup(token);
      expect(user).toBeNull();
      expect(userErrors).toHaveLength(2);
      expect(userErrors[0].field).toBe('email');
      expect(userErrors[0].message).toBe('Email is required');
      expect(userErrors[1].field).toBe('password');
      expect(userErrors[1].message).toBe('Password is required');
    });
  });

  describe('signin', () => {
    it('should return a user after signin', async () => {
      const token = 'token';
      jest.spyOn(resolver, 'signin').mockResolvedValue({
        user: {
          id: '1',
          name: 'User 1',
          auth0Id: 'auth0Id',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        userErrors: [],
      });

      const { user } = await resolver.signin(token);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.auth0Id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.isActive).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should return userErrors if signin fails', async () => {
      const token = 'token';
      jest.spyOn(resolver, 'signin').mockResolvedValue({
        user: null,
        userErrors: [
          {
            field: 'token',
            message: 'Invalid token',
          },
        ],
      });
      const { user, userErrors } = await resolver.signin(token);
      expect(user).toBeNull();
      expect(userErrors).toHaveLength(1);
      expect(userErrors[0].field).toBe('token');
      expect(userErrors[0].message).toBe('Invalid token');
    });
  });
});
