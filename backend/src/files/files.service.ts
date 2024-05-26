import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-minimal';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilesService {
  constructor(private configService: ConfigService) {}

  async store(file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = file;

    const filePath = this.configService.get('filepath.publicFiles');

    console.log({ filePath });

    const writeStream = createWriteStream(join(filePath, filename));

    new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(true));
      writeStream.on('error', (error) => reject(error));
      createReadStream().pipe(writeStream);
    });

    return true;
  }
}
