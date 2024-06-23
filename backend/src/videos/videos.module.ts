import { Module } from '@nestjs/common';
import { VideosService } from 'src/videos/videos.service';
import { VideosController } from 'src/videos/videos.controller';
import { VideosResolver } from 'src/videos/videos.resolver';

@Module({
  providers: [VideosService, VideosResolver],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
