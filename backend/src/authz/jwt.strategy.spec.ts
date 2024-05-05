import { JwtStrategy } from './jwt.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/user.model';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UsersService,
          useValue: {
            // Mock the necessary methods of the UsersService
            // to validate the payload and return a user
            user: jest
              .fn()
              .mockResolvedValue({ id: 'testUserId' } as UserModel),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate the payload and return a user', async () => {
    const payload = { sub: 'testUserId' };
    const user = await strategy.validate(payload);
    expect(user).toBeDefined();
    expect(user.id).toBe('testUserId');
  });

  it('should throw an UnauthorizedException if the payload is invalid', async () => {
    const payload = { sub: 'invalidUserId' };
    jest.spyOn(usersService, 'user').mockImplementation(() => {
      throw new UnauthorizedException('Unauthorized');
    });

    await expect(strategy.validate(payload)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
