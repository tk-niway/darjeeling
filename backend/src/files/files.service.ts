import { VideosService } from 'src/videos/videos.service';
import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-minimal';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(
    private configService: ConfigService,
    private videosService: VideosService,
  ) {}

  async store(file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = file;

    const filePath = this.configService.get('filepath.privateFileDir');

    console.log({ filePath });

    const writeStream = createWriteStream(join(filePath, filename));

    new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(filename));
      writeStream.on('error', (error) => reject(error));
      createReadStream().pipe(writeStream);
    })
      .then((filename: string) => {
        this.videosService.convertToHLS(filename);
      })
      .catch((error) => {
        console.error('Error put a file on private fileDir', error);
      });

    return true;
  }
}
