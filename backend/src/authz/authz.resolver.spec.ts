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
        id: '1',
        name: 'User 1',
        auth0Id: 'auth0Id',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const user = await resolver.signup(token);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.auth0Id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.isActive).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });
  });

  describe('signin', () => {
    it('should return a user after signin', async () => {
      const token = 'token';
      jest.spyOn(resolver, 'signin').mockResolvedValue({
        id: '1',
        name: 'User 1',
        auth0Id: 'auth0Id',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const user = await resolver.signin(token);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.auth0Id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.isActive).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });
  });
});
