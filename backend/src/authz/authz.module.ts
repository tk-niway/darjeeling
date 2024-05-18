import { AuthzService } from 'src/authz/authz.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/authz/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthzResolver } from 'src/authz/authz.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    AuthzService,
    JwtStrategy,
    PrismaService,
    AuthzResolver,
    UsersService,
  ],
  exports: [PassportModule],
})
export class AuthzModule {}
