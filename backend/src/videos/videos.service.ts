import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ffmpeg from 'fluent-ffmpeg';
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs';
import { FileUpload } from 'graphql-upload-minimal';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { Video } from 'src/generated/video/video.model';
import { IConfig } from 'src/config/config.interface';
import { UtilsService } from 'src/utils/utils.service';
import { rm } from 'fs/promises';
import { DeleteOneVideoArgs } from 'src/generated/video/delete-one-video.args';
import { FindUniqueVideoArgs } from 'src/generated/video/find-unique-video.args';
import { FindManyVideoArgs } from 'src/generated/video/find-many-video.args';
import { Prisma } from '@prisma/client';

@Injectable()
export class VideosService {
  constructor(
    private prismaService: PrismaService,
    private utilsService: UtilsService,
    private configService: ConfigService<IConfig, true>,
  ) {}

  private EXT_M3U8 = '.m3u8';
  private EXT_JPG = '.jpg';

  async totalCount(params: Prisma.VideoAggregateArgs): Promise<number> {
    const video = await this.prismaService.video.aggregate({
      where: { ...params.where },
      _count: true,
    });
    return video._count;
  }

  async video(data: FindUniqueVideoArgs) {
    return await this.prismaService.video.findUnique(data);
  }

  async videos(query: FindManyVideoArgs) {
    return await this.prismaService.video.findMany(query);
  }

  async createVideo(
    data: Parameters<PrismaService['video']['create']>[0],
  ): Promise<Video> {
    return await this.prismaService.video.create(data);
  }

  async updateVideo(
    data: Parameters<PrismaService['video']['update']>[0],
  ): Promise<Video> {
    return await this.prismaService.video.update(data);
  }

  async deleteVideo({ where }: DeleteOneVideoArgs): Promise<boolean> {
    try {
      const video = await this.prismaService.video.findUnique({
        where,
      });

      await this.deleteVideoDir(video);

      this.deleteThumbnail(video);

      await this.prismaService.video.delete({ where });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async m3u8Url(videoId: string): Promise<string | null> {
    const video = await this.prismaService.video.findUnique({
      where: { id: videoId },
      select: { url: true },
    });

    return video.url;
  }

  isVideoFile(fileUpload: FileUpload): boolean {
    // 動画ファイルのMIMEタイプのリスト
    const videoMimeTypes = [
      'video/mp4',
      'video/avi',
      'video/mov',
      'video/wmv',
      'video/flv',
      'video/quicktime',
    ];

    // アップロードされたファイルのMIMEタイプが動画ファイルのリストに含まれているかチェック
    return videoMimeTypes.includes(fileUpload.mimetype);
  }

  async videoFile(videoId: string, filename: string): Promise<string> {
    const filePath = join(
      this.configService.get('videosDirPath'),
      videoId,
      filename,
    );

    if (!existsSync(filePath)) return null;

    return filePath;
  }

  async storeVideo(file: FileUpload, video: Video): Promise<void> {
    const videoDirPath = this.getVideoDirPath(video);

    if (!existsSync(videoDirPath)) mkdirSync(videoDirPath, { recursive: true });

    const { extension } = this.utilsService.splitFilename(file.filename);

    const newFilename = video.id + '.' + extension;

    const filepath = join(videoDirPath, newFilename);

    try {
      await this.updateVideo({
        where: { id: video.id },
        data: { uploadStatus: 'processing' },
      });

      await this.upload(file, filepath);

      const url = await this.convertToHLS(filepath);

      const duration = await this.calcDuration(filepath);

      const updatedVideo = await this.updateVideo({
        where: { id: video.id },
        data: { uploadStatus: 'completed', url, duration },
      });

      if (updatedVideo.thumbnailUrl === null) {
        const thumbnailUrl = await this.createThumbnail(updatedVideo);

        await this.updateVideo({
          where: { id: updatedVideo.id },
          data: { thumbnailUrl },
        });
      }
    } catch (error) {
      console.error(error, filepath);

      await this.updateVideo({
        where: { id: video.id },
        data: { uploadStatus: 'failed' },
      });
    }
  }

  private async deleteVideoDir(video: Video): Promise<void> {
    const dirPath = this.getVideoDirPath(video);

    if (!existsSync(dirPath)) {
      throw new NotFoundException('Video not found');
    }

    try {
      await rm(dirPath, { recursive: true });

      console.log(`${dirPath} has been removed successfully.`);
    } catch (error) {
      throw new InternalServerErrorException('Error removing video directory');
    }
  }

  private async upload(file: FileUpload, filepath: string): Promise<string> {
    console.log('uploading file', { filepath });

    const writeStream = createWriteStream(filepath);

    return await new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log('file uploaded', { filepath });
        resolve(filepath);
      });

      writeStream.on('error', (error) => reject(error));

      file.createReadStream().pipe(writeStream);
    });
  }

  private async convertToHLS(filepath: string): Promise<string> {
    console.log('converting to HLS', { filepath });

    const videoId = filepath.split('/').pop().split('.')[0];

    const outPutFilepath = filepath.replace(/\.[^/.]+$/, this.EXT_M3U8);

    try {
      await this.processVideoToHLS(filepath, outPutFilepath);

      const url =
        this.configService.get('videoUrl') +
        join(videoId, videoId + this.EXT_M3U8);

      console.log('HLS conversion completed', { filepath, url });

      return url;
    } catch (error) {
      throw new Error(error);
    }
  }

  private async processVideoToHLS(
    filepath: string,
    outPutFilepath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg(filepath)
        .outputOptions([
          '-c:v libx264',
          '-c:a aac',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output(outPutFilepath)
        .on('start', () => console.log('ffmpeg started'))
        .on('error', (err) => {
          console.log('ffmpeg error', err);
          reject(err);
        })
        .on('progress', () => console.log('ffmpeg progress'))
        .on('end', () => {
          console.log('ffmpeg end');
          resolve();
        })
        .run();
    });
  }

  async calcDuration(filePath: string): Promise<number> {
    console.log('Calculating video duration', { filePath });

    if (!existsSync(filePath)) {
      throw new NotFoundException('Video file not found');
    }

    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          const duration = metadata.format.duration;
          resolve(duration);
        }
      });
    });
  }

  async createThumbnail(video: Video): Promise<string> {
    console.log('Creating thumbnail', video.id);

    const videoFilePath = join(this.getVideoDirPath(video), video.id + '0.ts');

    if (!existsSync(videoFilePath)) {
      throw new NotFoundException('Video file not found');
    }

    const filename = video.id + this.EXT_JPG;

    try {
      await this.generateThumbnail(
        videoFilePath,
        this.configService.get<string>('publicDirPath'),
        filename,
      );

      return this.configService.get('fileUrl') + filename;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating thumbnail');
    }
  }

  private async generateThumbnail(
    videoFilePath: string,
    thumbnailFilePath: string,
    filename: string,
    size: string = '1280x720',
    timemarks: number[] | string[] | undefined = [3],
  ): Promise<boolean> {
    console.log('Generating thumbnail', { videoFilePath, thumbnailFilePath });

    return new Promise((resolve, reject) => {
      ffmpeg(videoFilePath)
        .on('filenames', (filenames) => {
          console.log('Generated thumbnail file:', filenames.join(', '));
        })
        .on('end', () => {
          console.log('Thumbnail generation completed');
          resolve(true);
        })
        .on('error', (err) => {
          console.error('Error generating thumbnail:', err);
          reject(err);
        })
        .autopad(true, 'black')
        .aspectRatio('16:9')
        .screenshots({
          count: 1,
          folder: thumbnailFilePath,
          filename,
          size,
          timemarks,
        });
    });
  }

  private deleteThumbnail(video: Video): boolean {
    const filePath = join(
      this.configService.get<string>('publicDirPath'),
      video.id + this.EXT_JPG,
    );

    if (!existsSync(filePath)) {
      throw new NotFoundException('Video file not found');
    }

    unlinkSync(filePath);

    return true;
  }

  private getVideoDirPath(video: Video): string {
    return join(this.configService.get<string>('videosDirPath'), video.id);
  }
}
