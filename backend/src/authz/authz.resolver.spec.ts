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
});
