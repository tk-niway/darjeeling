import { Test, TestingModule } from '@nestjs/testing';
import { AuthzResolver } from './authz.resolver';

describe('AuthzResolver', () => {
  let resolver: AuthzResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthzResolver],
    }).compile();

    resolver = module.get<AuthzResolver>(AuthzResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
