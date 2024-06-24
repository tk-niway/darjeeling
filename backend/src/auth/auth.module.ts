import { AuthService } from 'src/auth/auth.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { AuthResolver } from 'src/auth/auth.resolver';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, JwtStrategy, AuthResolver, UsersService],
  exports: [PassportModule],
})
export class AuthModule {}
