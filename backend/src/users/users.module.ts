import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersResolver } from 'src/users/users.resolver';
import { AuthzModule } from 'src/authz/authz.module';
import { VideosService } from 'src/videos/videos.service';

@Module({
  imports: [AuthzModule],
  providers: [UsersService, UsersResolver, VideosService],
})
export class UsersModule {}
