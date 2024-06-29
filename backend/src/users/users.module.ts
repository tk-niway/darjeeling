import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersResolver } from 'src/users/users.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { VideosService } from 'src/videos/videos.service';
import { OwnVideosDataLoader } from 'src/users/dataloaders/ownVideos.dataloader';
import { InvitedVideosDataLoader } from 'src/users/dataloaders/invitedVideos.dataloader';

@Module({
  imports: [AuthModule],
  providers: [
    UsersService,
    UsersResolver,
    VideosService,
    OwnVideosDataLoader,
    InvitedVideosDataLoader,
  ],
})
export class UsersModule {}
