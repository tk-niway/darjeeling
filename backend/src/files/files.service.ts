import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-minimal';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor() {}

  async store(file: FileUpload): Promise<boolean> {
    const { createReadStream, filename } = file;

    const filePath = join(process.cwd(), 'storage', 'public', filename);

    console.log({ filePath });

    const writeStream = createWriteStream(filePath);

    new Promise((resolve, reject) => {
      writeStream.on('finish', () => resolve(true));
      writeStream.on('error', (error) => reject(error));
      createReadStream().pipe(writeStream);
    });

    return true;
  }
}
