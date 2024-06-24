import { Module } from '@nestjs/common';
import { VideosService } from 'src/videos/videos.service';
import { VideosController } from 'src/videos/videos.controller';
import { VideosResolver } from 'src/videos/videos.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [VideosService, VideosResolver, UsersService],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
