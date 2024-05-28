import { Module } from '@nestjs/common';
import { VideosService } from 'src/videos/videos.service';

@Module({
  providers: [VideosService],
  exports: [VideosService],
})
export class VideosModule {}
