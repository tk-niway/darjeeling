import { Module } from '@nestjs/common';
import { VideosService } from 'src/videos/videos.service';
import { VideosController } from 'src/videos/videos.controller';
import { VideosResolver } from 'src/videos/videos.resolver';
import { UsersService } from 'src/users/users.service';
import { UsersResolver } from 'src/users/users.resolver';

@Module({
  providers: [VideosService, VideosResolver, UsersResolver, UsersService],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
