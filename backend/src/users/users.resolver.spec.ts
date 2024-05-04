import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from 'src/users/users.resolver';
import { UsersService } from 'src/users/users.service';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/generated/user/user.model';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            totalCount: jest.fn(),
            user: jest.fn(),
            users: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersResolver = moduleRef.get<UsersResolver>(UsersResolver);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('user', () => {
    it('should return a user if found', async () => {
      const id = '1';
      const where = { id };
      const user: User = {
        id,
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersService, 'user').mockResolvedValue(user);

      expect(await usersResolver.user({ where })).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      const where = { id: '1' }; // Change the value of id to a string
      jest.spyOn(usersService, 'user').mockResolvedValue(null);

      await expect(usersResolver.user({ where })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const where = { id: '1' };
      jest.spyOn(usersService, 'user').mockRejectedValue(new Error());

      await expect(usersResolver.user({ where })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // Add users test cases here
  describe('users', () => {
    it('should return an array of users', async () => {
      const skip = 0;
      const take = 10;
      const cursor = null;
      const where = {};
      const orderBy = null;
      const users: User[] = [
        {
          id: '1',
          name: 'User 1',
          auth0Id: '',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'User 2',
          auth0Id: '',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(usersService, 'users').mockResolvedValue(users);
      jest.spyOn(usersService, 'totalCount').mockResolvedValue(users.length);

      const expected = {
        edges: users.map((user) => ({ cursor: user.id, node: user })),
        nodes: users,
        pageInfo: {
          endCursor: users[users.length - 1].id,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: users[0].id,
        },
        totalCount: users.length,
      };

      expect(
        await usersResolver.users({ skip, take, cursor, where, orderBy }),
      ).toEqual(expected);
    });

    it('should return users with hasNextPage and hasPreviousPage as true', async () => {
      const skip = 1;
      const take = 2; // ページネーションのサイズを2に設定
      const cursor = null;
      const where = {};
      const orderBy = null;
      const users: User[] = [
        // 3つのユーザーを作成してページネーションの範囲を超えるようにする
        {
          id: '1',
          name: 'User 1',
          auth0Id: '',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'User 2',
          auth0Id: '',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'User 3',
          auth0Id: '',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          name: 'User 4',
          auth0Id: '',
          email: '',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const slicedUsers = users.slice(skip, skip + take);

      jest.spyOn(usersService, 'users').mockResolvedValue(slicedUsers);
      jest.spyOn(usersService, 'totalCount').mockResolvedValue(users.length);

      const result = await usersResolver.users({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });

      expect(result).toEqual({
        edges: slicedUsers.map((user) => ({ cursor: user.id, node: user })),
        nodes: slicedUsers,
        pageInfo: {
          startCursor: users[skip].id,
          endCursor: users[skip + take - 1].id,
          hasNextPage: true,
          hasPreviousPage: true,
        },
        totalCount: users.length,
      });
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const skip = 0;
      const take = 10;
      const cursor = null;
      const where = {};
      const orderBy = null;
      jest.spyOn(usersService, 'users').mockRejectedValue(new Error());
      await expect(
        usersResolver.users({ skip, take, cursor, where, orderBy }),
      ).rejects.toThrow(Error);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const data = {
        auth0Id: 'auth0|1234567890',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      const createdUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        auth0Id: 'auth0|1234567890',
      };
      jest.spyOn(usersService, 'createUser').mockResolvedValue(createdUser);
      expect(await usersResolver.createUser({ data })).toEqual(createdUser);
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        auth0Id: 'auth0|1234567890',
      };
      jest
        .spyOn(usersService, 'createUser')
        .mockRejectedValue(new InternalServerErrorException());
      await expect(usersResolver.createUser({ data })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const currentUser: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data: UpdateOneUserArgs = {
        data: {
          name: { set: 'Updated User' },
          email: { set: 'updated@example.com' },
        },
        where: { id: '1' },
      };
      const updatedUser: User = {
        id: '1',
        name: 'Updated User',
        email: 'updated@example.com',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        auth0Id: '',
      };
      jest.spyOn(usersService, 'updateUser').mockResolvedValue(updatedUser);
      expect(await usersResolver.updateUser(currentUser, data)).toEqual(
        updatedUser,
      );
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const currentUser: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const data: UpdateOneUserArgs = {
        data: {
          name: { set: 'Updated User' },
          email: { set: 'updated@example.com' },
        },
        where: { id: '1' },
      };
      jest
        .spyOn(usersService, 'updateUser')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(usersResolver.updateUser(currentUser, data)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should update another user', async () => {
      const currentUser: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const data: UpdateOneUserArgs = {
        data: {
          name: { set: 'Updated User' },
          email: { set: 'updated@example.com' },
        },
        where: { id: '2' },
      };

      const updatedUser: User = {
        id: '2',
        name: 'Updated User',
        email: 'updated@example.com',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        auth0Id: '',
      };

      jest.spyOn(usersService, 'updateUser').mockResolvedValue(updatedUser);

      await expect(usersResolver.updateUser(currentUser, data)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const currentUser: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const where = { id: '1' };
      const deletedUser: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersService, 'deleteUser').mockResolvedValue(deletedUser);
      expect(await usersResolver.deleteUser(currentUser, { where })).toEqual(
        deletedUser,
      );
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const currentUser: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const where = { id: '1' };
      jest
        .spyOn(usersService, 'deleteUser')
        .mockRejectedValue(new InternalServerErrorException());
      await expect(
        usersResolver.deleteUser(currentUser, { where }),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should delete another user', async () => {
      const currentUser: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const where = { id: '2' };

      const deletedUser: User = {
        id: '2',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(usersService, 'deleteUser').mockResolvedValue(deletedUser);

      await expect(
        usersResolver.deleteUser(currentUser, { where }),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
