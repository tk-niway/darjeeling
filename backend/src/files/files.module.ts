import { Module } from '@nestjs/common';
import { FilesResolver } from 'src/files/files.resolver';
import { FilesService } from 'src/files/files.service';
import { VideosModule } from 'src/videos/videos.module';

@Module({
  imports: [VideosModule],
  providers: [FilesService, FilesResolver],
})
export class FilesModule {}
