import { Module } from '@nestjs/common';
import { FilesResolver } from 'src/files/files.resolver';
import { FilesService } from 'src/files/files.service';

@Module({
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}
