import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { validationSchema } from 'src/config/config.validation';
import { config } from 'src/config/main.config';
import { VideoModel } from 'src/videos/models/video.model';
import { InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

describe('VideosService', () => {
  let videosService: VideosService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          validationSchema,
          load: [config],
        }),
      ],
      providers: [VideosService, PrismaService, UtilsService, ConfigService],
    }).compile();

    videosService = module.get<VideosService>(VideosService);

    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
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

  it('should be defined', () => {
    expect(videosService).toBeDefined();
  });

  describe('totalCount', () => {
    it('should return the total count of videos', async () => {
      const count = 10;
      jest
        .spyOn(prismaService.video, 'aggregate')
        .mockResolvedValue({ _count: count } as any);

      expect(await videosService.totalCount({ where: {} })).toBe(count);
    });

    it('should return 0 if no videos', async () => {
      jest
        .spyOn(prismaService.video, 'aggregate')
        .mockResolvedValue({ _count: 0 } as any);

      expect(await videosService.totalCount({ where: {} })).toBe(0);
    });
  });

  describe('video', () => {
    it('should return a video', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockResolvedValue(testVideos[0]);

      expect(await videosService.video({ where: { id: '1' } })).toBe(
        testVideos[0],
      );
    });

    it('should return null if video not found', async () => {
      jest.spyOn(prismaService.video, 'findUnique').mockResolvedValue(null);

      expect(
        await videosService.video({ where: { id: 'invalid-id' } }),
      ).toBeNull();
    });

    it('should return undefined if video not found', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockResolvedValue(undefined);

      expect(
        await videosService.video({ where: { id: 'invalid-id' } }),
      ).toBeUndefined();
    });

    it('throws an error of internal server error', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(
        videosService.video({ where: { id: 'invalid-id' } }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('videos', () => {
    it('should return videos', async () => {
      jest.spyOn(prismaService.video, 'findMany').mockResolvedValue(testVideos);

      expect(await videosService.videos({ where: {} })).toBe(testVideos);
    });

    it('should return empty array if no videos', async () => {
      jest.spyOn(prismaService.video, 'findMany').mockResolvedValue([]);

      expect(await videosService.videos({ where: {} })).toEqual([]);
    });

    it('throws an error of internal server error', async () => {
      jest
        .spyOn(prismaService.video, 'findMany')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosService.videos({ where: {} })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createVideo', () => {
    const query: Prisma.VideoCreateArgs = {
      data: {
        title: '',
        ownerId: '',
      },
    };

    it('should create a video', async () => {
      jest
        .spyOn(prismaService.video, 'create')
        .mockResolvedValue(testVideos[0]);

      expect(await videosService.createVideo(query)).toBe(testVideos[0]);
    });

    it('should return undefined if no data', async () => {
      jest.spyOn(prismaService.video, 'create').mockReset();

      expect(await videosService.createVideo(query)).toBeUndefined();
    });

    it('throws an error of internal server error', async () => {
      jest
        .spyOn(prismaService.video, 'create')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosService.createVideo(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateVideo', () => {
    const query: Prisma.VideoUpdateArgs = {
      where: { id: '1' },
      data: { title: 'New Title' },
    };

    it('should update a video', async () => {
      jest
        .spyOn(prismaService.video, 'update')
        .mockResolvedValue(testVideos[0]);

      expect(await videosService.updateVideo(query)).toBe(testVideos[0]);
    });

    it('should return undefined if no data', async () => {
      jest.spyOn(prismaService.video, 'update').mockReset();

      expect(await videosService.updateVideo(query)).toBeUndefined();
    });

    it('throws an error of internal server error', async () => {
      jest
        .spyOn(prismaService.video, 'update')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosService.updateVideo(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteVideo', () => {
    const query: Prisma.VideoDeleteArgs = { where: { id: '1' } };

    it('should delete a video', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockResolvedValue(testVideos[0]);
      jest
        .spyOn(prismaService.video, 'delete')
        .mockResolvedValue(testVideos[0]);
      jest
        .spyOn(videosService as any, 'deleteVideoDir')
        .mockResolvedValue(true);
      jest
        .spyOn(videosService as any, 'deleteThumbnail')
        .mockResolvedValue(true);

      expect(await videosService.deleteVideo(query)).toBe(testVideos[0]);
    });

    it('should return undefined if no data', async () => {
      jest.spyOn(prismaService.video, 'findUnique').mockReset();

      expect(await videosService.deleteVideo(query)).toBeUndefined();
    });

    it('throws an error of internal server error', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosService.deleteVideo(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('throw an error from deleteVideoDir', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockResolvedValue(testVideos[0]);
      jest
        .spyOn(prismaService.video, 'delete')
        .mockResolvedValue(testVideos[0]);
      jest
        .spyOn(videosService as any, 'deleteVideoDir')
        .mockRejectedValue(new Error());
      jest
        .spyOn(videosService as any, 'deleteThumbnail')
        .mockResolvedValue(true);

      await expect(videosService.deleteVideo(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('throw an error from deleteThumbnail', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockResolvedValue(testVideos[0]);
      jest
        .spyOn(prismaService.video, 'delete')
        .mockResolvedValue(testVideos[0]);
      jest
        .spyOn(videosService as any, 'deleteVideoDir')
        .mockResolvedValue(true);
      jest
        .spyOn(videosService as any, 'deleteThumbnail')
        .mockRejectedValue(new Error());

      await expect(videosService.deleteVideo(query)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should return undefined if video not found', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockResolvedValue(testVideos[0]);
      jest.spyOn(prismaService.video, 'delete').mockResolvedValue(undefined);
      jest
        .spyOn(videosService as any, 'deleteVideoDir')
        .mockResolvedValue(true);
      jest
        .spyOn(videosService as any, 'deleteThumbnail')
        .mockResolvedValue(true);

      expect(await videosService.deleteVideo(query)).toBeUndefined();
    });
  });

  describe('videosWithCount', () => {
    it('should return videos with total count', async () => {
      jest.spyOn(prismaService.video, 'findMany').mockResolvedValue(testVideos);
      jest
        .spyOn(prismaService.video, 'aggregate')
        .mockResolvedValue({ _count: 10 } as any);

      const videosWithCount = await videosService.videosWithCount({
        where: {},
      });

      expect(Array.isArray(videosWithCount.videos)).toBe(true);
      expect(videosWithCount.videos).toBe(testVideos);
      expect(videosWithCount.totalCount).toBe(10);
    });

    it('should return an empty array if no videos found', async () => {
      jest.spyOn(prismaService.video, 'findMany').mockResolvedValue([]);
      jest
        .spyOn(prismaService.video, 'aggregate')
        .mockResolvedValue({ _count: 0 } as any);

      const videosWithCount = await videosService.videosWithCount({
        where: {},
      });

      expect(Array.isArray(videosWithCount.videos)).toBe(true);
      expect(videosWithCount.videos).toHaveLength(0);
    });

    it('throws an error of internal server error', async () => {
      jest.spyOn(prismaService.video, 'findMany').mockResolvedValue([]);
      jest
        .spyOn(prismaService.video, 'aggregate')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(
        videosService.videosWithCount({ where: {} }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('m3u8Url', () => {
    it('should return m3u8 url', async () => {
      const video = testVideos[0];

      jest.spyOn(prismaService.video, 'findUnique').mockResolvedValue(video);

      const url = await videosService.m3u8Url(video.id);

      expect(url).toBe(video.url);
    });

    it('should return undefined if video not found', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockResolvedValue(undefined);

      const url = await videosService.m3u8Url('invalid-id');

      expect(url).toBeUndefined();
    });

    it('throws an error of internal server error', async () => {
      jest
        .spyOn(prismaService.video, 'findUnique')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(videosService.m3u8Url('invalid-id')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('isVideoFile', () => {
    it('should return true if file is video.mp4', () => {
      const file = {
        filename: 'video.mp4',
        fieldName: 'video',
        mimetype: 'video/mp4',
        encoding: '7bit',
        createReadStream: () => null,
      };

      expect(videosService.isVideoFile(file)).toBe(true);
    });

    it('should return true if file is video.avi', () => {
      const file = {
        filename: 'video.avi',
        fieldName: 'video',
        mimetype: 'video/avi',
        encoding: '7bit',
        createReadStream: () => null,
      };

      expect(videosService.isVideoFile(file)).toBe(true);
    });

    it('should return true if file is video.mov', () => {
      const file = {
        filename: 'video.mov',
        fieldName: 'video',
        mimetype: 'video/mov',
        encoding: '7bit',
        createReadStream: () => null,
      };

      expect(videosService.isVideoFile(file)).toBe(true);
    });

    it('should return true if file is video.wmv', () => {
      const file = {
        filename: 'video.wmv',
        fieldName: 'video',
        mimetype: 'video/wmv',
        encoding: '7bit',
        createReadStream: () => null,
      };

      expect(videosService.isVideoFile(file)).toBe(true);
    });

    it('should return true if file is video.flv', () => {
      const file = {
        filename: 'video.flv',
        fieldName: 'video',
        mimetype: 'video/flv',
        encoding: '7bit',
        createReadStream: () => null,
      };

      expect(videosService.isVideoFile(file)).toBe(true);
    });

    it('should return true if file is video.quicktime', () => {
      const file = {
        filename: 'video.quicktime',
        fieldName: 'video',
        mimetype: 'video/quicktime',
        encoding: '7bit',
        createReadStream: () => null,
      };

      expect(videosService.isVideoFile(file)).toBe(true);
    });

    it('should return false if file is not video', () => {
      const file = {
        filename: 'image.jpg',
        fieldName: 'image',
        mimetype: 'image/jpeg',
        encoding: '7bit',
        createReadStream: () => null,
      };

      expect(videosService.isVideoFile(file)).toBe(false);
    });
  });

  // TODO implements videoFile, storeVideo, calcDuration, createThumbnail
});
