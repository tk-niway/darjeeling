import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersResolver } from 'src/users/users.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { VideosService } from 'src/videos/videos.service';

@Module({
  imports: [AuthModule],
  providers: [UsersService, UsersResolver, VideosService],
})
export class UsersModule {}
