import { Module } from '@nestjs/common';
import { VideosService } from 'src/videos/videos.service';
import { VideosController } from 'src/videos/videos.controller';
import { VideosResolver } from 'src/videos/videos.resolver';
import { UsersService } from 'src/users/users.service';
import { GuestsDataLoader } from 'src/videos/dataloaders/guests.dataloader';
import { OwnerDataLoader } from 'src/videos/dataloaders/owner.dataloader';

@Module({
  providers: [
    VideosService,
    VideosResolver,
    UsersService,
    GuestsDataLoader,
    OwnerDataLoader,
  ],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
