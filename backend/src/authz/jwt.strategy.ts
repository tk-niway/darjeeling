import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
          'https://dev-zdsbeipv08r5b4ax.us.auth0.com/.well-known/jwks.json',
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'https://skill-up-rails',
      issuer: 'https://dev-zdsbeipv08r5b4ax.us.auth0.com/',
      algorithms: ['RS256'],
    });
  }

  async validate(payload: { sub: string }): Promise<User> {
    console.log('authz this.validate', { payload });

    const user = this.prismaService.user.findUniqueOrThrow({
      where: { auth0Id: payload.sub },
    });

    return user;
  }
}
