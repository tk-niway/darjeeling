import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ffmpeg from 'fluent-ffmpeg';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class VideosService {
  constructor(private configService: ConfigService) {}

  async convertToHLS(filename: string) {
    console.log('Converting to HLS', { filename });

    const filePath = join(
      this.configService.get('filepath.privateFileDir'),
      filename,
    );

    const dirPath = join(
      this.configService.get('filepath.privateFileDir'),
      filename.split('.')[0],
    );

    if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });

    const outPutPath = join(dirPath, filename.split('.')[0]);

    return new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .outputOptions([
          '-c:v libx264',
          '-c:a aac',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output(`${outPutPath}.m3u8`)
        .on('start', () => console.log('ffmpeg started'))
        .on('error', (err) => {
          console.log('ffmpeg error', err);
          reject(err);
        })
        .on('progress', () => console.log('ffmpeg progress'))
        .on('end', () => {
          console.log('ffmpeg end');
          resolve(true);
        })

        .run();
    });
  }
}
