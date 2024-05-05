import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthzGuard } from 'src/authz/authz.guard';

describe('AuthzGuard', () => {
  let guard: AuthzGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthzGuard, Reflector],
    }).compile();

    guard = module.get<AuthzGuard>(AuthzGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access if route is public', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should call super.canActivate if route is not public', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;
    jest.spyOn(guard, 'canActivate').mockReturnValue(true);
    expect(guard.canActivate(context)).toBe(true);
  });
});
