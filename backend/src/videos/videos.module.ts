import { Module } from '@nestjs/common';
import { VideosService } from 'src/videos/videos.service';
import { VideosController } from './videos.controller';

@Module({
  providers: [VideosService],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
