import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UsersService } from 'src/users/users.service';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    const issuer = process.env.AUTH0_ISSUER || '';

    const audience = process.env.AUTH0_AUDIENCE || '';

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

  async validate(payload: { sub: string }): Promise<UserModel> {
    const user = this.usersService.user({
      auth0Id: payload.sub,
      isActive: true,
    });

    return user;
  }
}
