import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { config } from 'src/config/main.config';
import { validationSchema } from 'src/config/config.validation';
import { UtilsService } from 'src/utils/utils.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let reflector: Reflector;

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
      providers: [AuthGuard, Reflector, UtilsService],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw UnauthorizedException if user is not defined', () => {
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;
    expect(() => guard.handleRequest(null, null, null, context)).toThrow();
  });

  it('should throw UnauthorizedException if token is expired', () => {
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;
    expect(() =>
      guard.handleRequest(
        null,
        null,
        'TokenExpiredError: jwt expired',
        context,
      ),
    ).toThrow();
  });
});
