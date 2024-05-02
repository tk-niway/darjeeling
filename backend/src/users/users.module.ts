import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersResolver } from 'src/users/users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthzModule } from 'src/authz/authz.module';

@Module({
  imports: [AuthzModule],
  providers: [UsersService, UsersResolver, PrismaService],
})
export class UsersModule {}
