import { Test, TestingModule } from '@nestjs/testing';
import { VideosResolver } from './videos.resolver';
import { VideoModel } from 'src/videos/models/video.model';
import { DeleteOneVideoArgs } from 'src/generated/video/delete-one-video.args';
import { UpdateOneVideoArgs } from 'src/generated/video/update-one-video.args';
import { FindManyUserArgs } from 'src/generated/user/find-many-user.args';
import { FindUniqueVideoArgs } from 'src/generated/video/find-unique-video.args';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { UserModel } from 'src/users/models/user.model';
import { FileUpload } from 'graphql-upload-minimal';
import { VideosService } from 'src/videos/videos.service';
import { UtilsService } from 'src/utils/utils.service';
import { GuestsDataLoader } from 'src/videos/dataloaders/guests.dataloader';
import { OwnerDataLoader } from 'src/videos/dataloaders/owner.dataloader';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from 'src/config/config.validation';
import { config } from 'src/config/main.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';

describe('VideosResolver', () => {
  let videosResolver: VideosResolver;
  let ownerDataLoader: OwnerDataLoader;
  let guestsDataLoader: GuestsDataLoader;
  let videosService: VideosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        VideosResolver,
        UtilsService,
        GuestsDataLoader,
        UsersService,
        VideosService,
        {
          provide: OwnerDataLoader,
          useValue: {
            load: jest.fn(),
          },
        },
        {
          provide: GuestsDataLoader,
          useValue: {
            load: jest.fn(),
          },
        },
      ],
    }).compile();

    videosService = module.get<VideosService>(VideosService);

    videosResolver = module.get<VideosResolver>(VideosResolver);

    ownerDataLoader = await module.resolve<OwnerDataLoader>(OwnerDataLoader);

    guestsDataLoader = await module.resolve<GuestsDataLoader>(GuestsDataLoader);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(videosResolver).toBeDefined();
  });

  const testVideos: VideoModel[] = [];
  for (let i = 1; i <= 10; i++) {
    const video: VideoModel = {
      id: `${i}`,
      title: `Video ${i}`,
      description: `Description ${i}`,
      thumbnailUrl: `http://localhost:3000/videos/${i}/${i}.jpg`,
      url: `http://localhost:3000/videos/${i}/${i}.m3u8`,
      duration: 0,
      visibility: 'public',
      uploadStatus: 'pending',
      ownerId: `owner-${i}`,
      playCount: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    testVideos.push(video);
  }

  const test_user: UserModel = {
    id: '1',
    name: 'John Doe',
    email: 'email@example.com',
    auth0Id: '',
    isActive: false,
    createdAt: undefined,
    updatedAt: undefined,
  };

  describe('owner', () => {
    it('should return the owner of the video', async () => {
      jest.spyOn(ownerDataLoader, 'load').mockResolvedValue(test_user);

      // Call the resolver function
      const result = await videosResolver.owner(testVideos[0]);

      // Assert the result
      expect(result).toEqual(test_user);
    });
  });

  describe('guests', () => {
    const query = {
      skip: 0,
      take: 10,
      cursor: null,
      where: {},
      orderBy: null,
    };

    it('should return the guests of the video', async () => {
      const video = testVideos[0];

      // Mock query arguments
      const query: FindManyUserArgs = {
        where: {
          id: {
            equals: video.id,
          },
        },
      };

      jest.spyOn(guestsDataLoader, 'load').mockResolvedValue([test_user]);

      // Call the videosResolver function
      const result = await videosResolver.guests(video, query);

      // Assert the result
      expect(result).toEqual([test_user]);
    });
  });

  describe('video', () => {
    it('should return a video by ID', async () => {
      const video = testVideos[0];

      // Mock query arguments
      const query: FindUniqueVideoArgs = {
        where: {
          id: '1',
        },
      };

      jest.spyOn(videosService, 'video').mockResolvedValue(video);

      // Call the videosResolver function
      const result = await videosResolver.video(query);

      // Assert the result
      expect(result).toEqual(video);
    });

    it('should throw an error if the video is not found', async () => {
      // Mock query arguments
      const query: FindUniqueVideoArgs = {
        where: {
          id: '1',
        },
      };

      jest.spyOn(videosService, 'video').mockResolvedValue(undefined);

      await expect(videosResolver.video(query)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throw an error of internal server error', async () => {
      // Mock query arguments
      const query: FindUniqueVideoArgs = {
        where: {
          id: '1',
        },
      };

      jest
        .spyOn(videosService, 'video')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosResolver.video(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('videos', () => {
    const query = {
      skip: 0,
      take: 10,
      cursor: null,
      where: {},
      orderBy: null,
    };

    it('should return all videos', async () => {
      jest
        .spyOn(videosService, 'videosWithCount')
        .mockResolvedValue({ videos: testVideos, totalCount: 10 });

      // Call the videosResolver function
      const result = await videosResolver.videos(query);

      const expected = {
        edges: testVideos.map((video) => ({ cursor: video.id, node: video })),
        nodes: testVideos,
        pageInfo: {
          endCursor: testVideos[testVideos.length - 1].id,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: testVideos[0].id,
        },
        totalCount: testVideos.length,
      };

      // Assert the result
      expect(result).toEqual(expected);
    });

    it('should throw an error if the video is not found', async () => {
      jest
        .spyOn(videosService, 'videosWithCount')
        .mockResolvedValue({ videos: [], totalCount: 0 });

      const result = await videosResolver.videos(query);

      expect(result).toEqual({
        edges: [],
        nodes: [],
        pageInfo: {
          endCursor: '',
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: '',
        },
        totalCount: 0,
      });
    });

    it('throw an error of internal server error', async () => {
      jest
        .spyOn(videosService, 'videosWithCount')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosResolver.videos(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateVideo', () => {
    it('should update a video', async () => {
      const video = testVideos[0];

      const title = 'Updated Video';

      // Mock query arguments
      const query: UpdateOneVideoArgs = {
        where: {
          id: '1',
        },
        data: {
          title: { set: title },
        },
      };

      jest
        .spyOn(videosService, 'updateVideo')
        .mockResolvedValue({ ...video, title });

      // Call the videosResolver function
      const result = await videosResolver.updateVideo(query);

      // Assert the result
      expect(result.id).toEqual(video.id);
      expect(result.title).toEqual(title);
    });

    it('should throw an error if the video is not found', async () => {
      // Mock query arguments
      const query: UpdateOneVideoArgs = {
        where: {
          id: '1',
        },
        data: {
          title: { set: 'Updated Video' },
        },
      };

      jest.spyOn(videosService, 'updateVideo').mockResolvedValue(undefined);

      await expect(videosResolver.updateVideo(query)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throw an error of internal server error', async () => {
      // Mock query arguments
      const query: UpdateOneVideoArgs = {
        where: {
          id: '1',
        },
        data: {
          title: { set: 'Updated Video' },
        },
      };

      jest
        .spyOn(videosService, 'updateVideo')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosResolver.updateVideo(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteVideo', () => {
    it('should delete a video', async () => {
      const video = testVideos[0];

      // Mock query arguments
      const query: DeleteOneVideoArgs = {
        where: {
          id: '1',
        },
      };

      jest.spyOn(videosService, 'deleteVideo').mockResolvedValue(video);

      // Call the videosResolver function
      const result = await videosResolver.deleteVideo(query);

      // Assert the result
      expect(result).toEqual(video);
    });

    it('should throw an error if the video is not found', async () => {
      // Mock query arguments
      const query: DeleteOneVideoArgs = {
        where: {
          id: '1',
        },
      };

      jest.spyOn(videosService, 'deleteVideo').mockResolvedValue(undefined);

      await expect(videosResolver.deleteVideo(query)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('throw an error of internal server error', async () => {
      // Mock query arguments
      const query: DeleteOneVideoArgs = {
        where: {
          id: '1',
        },
      };

      jest
        .spyOn(videosService, 'deleteVideo')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosResolver.deleteVideo(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // TODO Implement uploadVideo test.
});
