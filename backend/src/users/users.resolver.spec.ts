import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from 'src/users/users.resolver';
import { UsersService } from 'src/users/users.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/generated/user/user.model';
import { UpdateOneUserArgs } from 'src/generated/user/update-one-user.args';
import { ConfigModule } from '@nestjs/config';
import { config } from 'src/config/main.config';
import { validationSchema } from 'src/config/config.validation';
import { UtilsService } from 'src/utils/utils.service';
import { InvitedVideosDataLoader } from 'src/users/dataloaders/invitedVideos.dataloader';
import { OwnVideosDataLoader } from 'src/users/dataloaders/ownVideos.dataloader';
import { VideosService } from 'src/videos/videos.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VideoModel } from 'src/videos/models/video.model';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let usersService: UsersService;
  let ownVideosDataLoader: OwnVideosDataLoader;
  let invitedVideosDataLoader: InvitedVideosDataLoader;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          validationSchema,
          load: [config],
        }),
        PrismaModule,
      ],
      providers: [
        UsersResolver,
        UtilsService,
        InvitedVideosDataLoader,
        VideosService,
        UsersService,
        {
          provide: OwnVideosDataLoader,
          useValue: {
            load: jest.fn(),
          },
        },
        {
          provide: InvitedVideosDataLoader,
          useValue: {
            load: jest.fn(),
          },
        },
      ],
    }).compile();

    usersResolver = await moduleRef.resolve<UsersResolver>(UsersResolver);

    usersService = moduleRef.get<UsersService>(UsersService);

    ownVideosDataLoader = await moduleRef.resolve<OwnVideosDataLoader>(
      OwnVideosDataLoader,
    );

    invitedVideosDataLoader = await moduleRef.resolve<InvitedVideosDataLoader>(
      InvitedVideosDataLoader,
    );
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

    it('should throw NotFoundException if user is null', async () => {
      const where = { id: '1' }; // Change the value of id to a string
      jest.spyOn(usersService, 'user').mockResolvedValue(null);

      await expect(usersResolver.user({ where })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if user is undefined', async () => {
      const where = { id: '1' }; // Change the value of id to a string
      jest.spyOn(usersService, 'user').mockResolvedValue(undefined);

      await expect(usersResolver.user({ where })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const where = { id: '1' };

      jest
        .spyOn(usersService, 'user')
        .mockRejectedValue(new InternalServerErrorException());

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

      jest.spyOn(usersService, 'usersWithCount').mockResolvedValue({
        users,
        totalCount: users.length,
      });

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

      jest.spyOn(usersService, 'usersWithCount').mockResolvedValue({
        users: slicedUsers,
        totalCount: users.length,
      });

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

    it('should return user = [], totalCount = 0, hasNextPage = false, hasPreviousPage = false', async () => {
      const skip = 0;
      const take = 10;
      const cursor = null;
      const where = {};
      const orderBy = null;

      jest.spyOn(usersService, 'usersWithCount').mockResolvedValue({
        users: [],
        totalCount: 0,
      });

      const result = await usersResolver.users({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });

      expect(result).toEqual({
        edges: [],
        nodes: [],
        pageInfo: {
          startCursor: '',
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
        },
        totalCount: 0,
      });
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const skip = 0;
      const take = 10;
      const cursor = null;
      const where = {};
      const orderBy = null;

      jest
        .spyOn(usersService, 'usersWithCount')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(
        usersResolver.users({ skip, take, cursor, where, orderBy }),
      ).rejects.toThrow(InternalServerErrorException);
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

      expect(await usersResolver.createUser(data)).toEqual(createdUser);
    });

    it('should return undefined with empty args', async () => {
      const data = {
        name: '',
        email: '',
        password: '',
        auth0Id: '',
      };

      jest.spyOn(usersService, 'createUser').mockResolvedValue(undefined);

      await expect(usersResolver.createUser(data)).rejects.toThrow(
        BadRequestException,
      );
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

      await expect(usersResolver.createUser(data)).rejects.toThrow(
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

      expect(await usersResolver.updateUser(data)).toEqual(updatedUser);
    });

    it('should return undefined with empty args', async () => {
      const data: UpdateOneUserArgs = {
        data: {
          name: { set: '' },
          email: { set: '' },
        },
        where: { id: '1' },
      };

      jest.spyOn(usersService, 'updateUser').mockResolvedValue(undefined);

      await expect(usersResolver.updateUser(data)).rejects.toThrow(
        BadRequestException,
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

      await expect(usersResolver.updateUser(data)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
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

      expect(await usersResolver.deleteUser({ where })).toEqual(deletedUser);
    });

    it('should return undefined with empty args', async () => {
      const where = { id: '' };

      jest.spyOn(usersService, 'deleteUser').mockResolvedValue(undefined);

      await expect(usersResolver.deleteUser({ where })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const where = { id: '1' };

      jest
        .spyOn(usersService, 'deleteUser')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(usersResolver.deleteUser({ where })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('invitedVideos', () => {
    const invitedVideos: VideoModel[] = [
      {
        id: '1',
        title: 'Video 1',
        url: 'http://example.com/video1.m3u8',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Video 1の説明', // VideoModelに必要な追加のプロパティ
        thumbnailUrl: 'http://example.com/thumbnail1.jpg',
        duration: 120,
        visibility: 'public',
        uploadStatus: 'pending',
        ownerId: '',
        playCount: 0,
        isActive: false,
      },
      {
        id: '2',
        title: 'Video 2',
        url: 'http://example.com/video2.m3u8',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Video 2の説明',
        thumbnailUrl: 'http://example.com/thumbnail2.jpg',
        duration: 150,
        visibility: 'public',
        uploadStatus: 'pending',
        ownerId: '',
        playCount: 0,
        isActive: false,
      },
    ];

    const query = {
      skip: 0,
      take: 10,
      cursor: null,
      where: {},
      orderBy: null,
    };

    const user: User = {
      id: '1',
      name: 'Test User',
      auth0Id: '',
      email: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return an array of videos', async () => {
      jest
        .spyOn(invitedVideosDataLoader, 'load')
        .mockResolvedValue(invitedVideos);

      expect(await usersResolver.invitedVideos(user, query)).toEqual(
        invitedVideos,
      );
    });

    it('should return an empty array if no videos are found', async () => {
      const user: User = {
        id: '1',
        name: 'Test User',
        auth0Id: '',
        email: '',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(invitedVideosDataLoader, 'load').mockResolvedValue([]);

      expect(await usersResolver.invitedVideos(user, query)).toEqual([]);
    });
  });

  describe('ownVideos', () => {
    const ownVideos: VideoModel[] = [
      {
        id: '1',
        title: 'Video 1',
        url: 'http://example.com/video1.m3u8',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Video 1の説明',
        thumbnailUrl: 'http://example.com/thumbnail1.jpg',
        duration: 120,
        visibility: 'public',
        uploadStatus: 'pending',
        ownerId: '',
        playCount: 0,
        isActive: false,
      },
      {
        id: '2',
        title: 'Video 2',
        url: 'http://example.com/video2.m3u8',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: 'Video 2の説明',
        thumbnailUrl: 'http://example.com/thumbnail2.jpg',
        duration: 150,
        visibility: 'public',
        uploadStatus: 'pending',
        ownerId: '',
        playCount: 0,
        isActive: false,
      },
    ];

    const query = {
      skip: 0,
      take: 10,
      cursor: null,
      where: {},
      orderBy: null,
    };

    const user: User = {
      id: '1',
      name: 'Test User',
      auth0Id: '',
      email: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return an array of videos', async () => {
      jest.spyOn(ownVideosDataLoader, 'load').mockResolvedValue(ownVideos);

      expect(await usersResolver.ownVideos(user, query)).toEqual(ownVideos);
    });

    it('should return an empty array if no videos are found', async () => {
      jest.spyOn(ownVideosDataLoader, 'load').mockResolvedValue([]);

      expect(await usersResolver.ownVideos(user, query)).toEqual([]);
    });
  });
});
