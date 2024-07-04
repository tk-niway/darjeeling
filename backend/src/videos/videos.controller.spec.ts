import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from 'src/videos/videos.service';
import { RefererGuard } from 'src/common/guards/referer.guard';
import { ExecutionContext } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from 'src/utils/utils.service';

describe('VideosController', () => {
  let app: NestFastifyApplication;
  let controller: VideosController;
  let videosService: VideosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        ConfigService,
        UtilsService,
        {
          provide: VideosService,
          useValue: {
            m3u8Url: jest.fn(),
            videoFile: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(RefererGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => true,
      })
      .compile();

    controller = await module.resolve<VideosController>(VideosController);

    videosService = await module.resolve<VideosService>(VideosService);

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();

    await app.getHttpAdapter().getInstance().ready();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('m3u8', () => {
    it('should return the m3u8 URL', async () => {
      const videoId = 'testVideoId';

      const mockUrl = 'http://example.com/testVideoId/testVideoId.m3u8';

      jest.spyOn(videosService, 'm3u8Url').mockResolvedValue(mockUrl);

      const response = await app.inject({
        method: 'GET',
        url: `/videos/${videoId}`,
      });

      expect(response.payload).toEqual(mockUrl);
    });

    it('should return a 404 error if the video is not found', async () => {
      const videoId = 'testVideoId';

      jest.spyOn(videosService, 'm3u8Url').mockResolvedValue(null);

      const response = await app.inject({
        method: 'GET',
        url: `/videos/${videoId}`,
      });

      expect(response.statusCode).toEqual(404);
      const payloadObj = JSON.parse(response.payload);
      expect(payloadObj.message).toEqual('Video not found');
    });
  });

  describe('streamVideo', () => {
    it('should stream the video file', async () => {
      const videoId = 'testVideoId';
      const filename = 'testFile.mp4';
      const mockFilePath = './package.json'; // This is a dummy file path. Use a real file path in a real test.

      jest.spyOn(videosService, 'videoFile').mockResolvedValue(mockFilePath);

      jest.mock('fs', () => ({
        createReadStream: jest.fn().mockReturnValue('test_test'),
      }));

      const response = await app.inject({
        method: 'GET',
        url: `/videos/${videoId}/${filename}`,
      });

      expect(response.statusCode).toEqual(200);
    });

    it('should return a 404 error if the video is not found', async () => {
      const videoId = 'testVideoId';
      const filename = 'testFile.mp4';

      jest.spyOn(videosService, 'videoFile').mockResolvedValue(null);

      const response = await app.inject({
        method: 'GET',
        url: `/videos/${videoId}/${filename}`,
      });

      expect(response.statusCode).toEqual(404);
      const payloadObj = JSON.parse(response.payload);
      expect(payloadObj.message).toEqual('Video not found');
    });
  });
});
