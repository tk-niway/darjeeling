import { Test, TestingModule } from '@nestjs/testing';
import { AuthzResolver } from 'src/authz/authz.resolver';
import { AuthzService } from 'src/authz/authz.service';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/authz/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

describe('AuthzResolver', () => {
  let resolver: AuthzResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthzResolver,
        AuthzService,
        ConfigService,
        JwtStrategy,
        PrismaService,
        UsersService,
      ],
    }).compile();

    resolver = module.get<AuthzResolver>(AuthzResolver);
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
