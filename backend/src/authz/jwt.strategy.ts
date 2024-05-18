import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/generated/user/user.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    const issuer = configService.get('AUTH0_ISSUER');

    const audience = configService.get('AUTH0_AUDIENCE');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${issuer}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `https://${audience}`,
      issuer: `https://${issuer}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: { sub: string }): Promise<User> {
    const user = await this.usersService.user({
      auth0Id: payload.sub,
    });

    if (!user) throw new UnauthorizedException('User not found');

    if (!user.isActive)
      throw new UnauthorizedException('The user is not active');

    return user;
  }
}
