import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';
import { UserWithError } from 'src/users/models/userWithError.model';

type JWKFile = {
  keys: jwkToPem.JWK[];
};

type AuthUser = {
  sub: string; //'auth0|1111e1111',
  name: string; //'sample_email@example.co.jp',
  email?: string; //'sample_email@example.co.jp',
  nickname?: string; //'pass_mail39-fake',
  picture?: string; //'https://s.gravatar.com/avatar/6300335fab25778d49eafa4ff8b52b83?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpa.png',
  updated_at?: string; //'2024-05-02T13:07:09.292Z',
  email_verified?: boolean; //false
};

type DecodedToken = {
  iss: string; //'https://dev-zdsbeipv08r5b4ax.us.auth0.com/',
  sub: string; //'auth0|65f058260bc931745574623e',
  aud: string[]; //['https://skill-up-rails', 'https://dev-zdsbeipv08r5b4ax.us.auth0.com/userinfo'],
  iat: number; //1714655232,
  exp: number; //1714741632,
  scope: string; //'openid profile email',
  azp: string; //'5PikSd8q9U4oGA7dexFCwb9ttXfeNEkv'
};

@Injectable()
export class AuthService {
  private issuer: string;

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    this.issuer = this.configService.get('AUTH0_ISSUER');
  }

  async signup(token: string): Promise<UserWithError> {
    const authUser = await this.fetchUser(token);

    const user = await this.usersService.user({
      where: { auth0Id: authUser.sub },
    });

    // the user is forbidden to signin
    if (user && !user.isActive) {
      return {
        user: null,
        userErrors: [{ message: 'User is not active', field: null }],
      };
    }

    const createdUser = await this.usersService.createUser({
      auth0Id: authUser.sub,
      email: authUser.email,
      name: authUser.name,
    });

    return { user: createdUser, userErrors: [] };
  }

  async signin(token: string): Promise<UserWithError> {
    const decodedToken = (await this.verifyJwt(token)) as
      | DecodedToken
      | undefined;

    if (!decodedToken || !decodedToken.sub) {
      throw new UnauthorizedException(`Invalid token ${{ decodedToken }}`);
    }

    const user = await this.usersService.user({
      where: { auth0Id: decodedToken.sub },
    });

    // the user is not found
    if (!user) {
      return {
        user: null,
        userErrors: [{ message: 'User not found', field: null }],
      };
    }

    // the user is forbidden to signin
    if (!user.isActive) {
      return {
        user: null,
        userErrors: [{ message: 'User is not active', field: null }],
      };
    }

    return { user, userErrors: [] };
  }

  private verifyJwt = (token: string): Promise<string | JwtPayload> => {
    return new Promise(
      async (resolve, reject): Promise<string | JwtPayload> => {
        // make a request to get the JWKs
        const jwks = (await (
          await fetch(`https://${this.issuer}/.well-known/jwks.json`)
        ).json()) as JWKFile | undefined;

        if (!jwks || jwks.keys?.[0] == undefined) {
          return undefined;
        }

        // convert the jwks to a pem string
        const pem = jwkToPem(jwks.keys[0]);

        jwt.verify(
          token,
          pem,
          {
            algorithms: ['RS256'],
            // audience: 'https://${this.audienc}',
            // issuer: issuer,
          },
          (err, decoded) => {
            if (err) return reject(new UnauthorizedException(err.name));

            return resolve(decoded);
          },
        );
      },
    );
  };

  private async fetchUser(token: string): Promise<AuthUser> {
    try {
      const response = await fetch(`https://${this.issuer}/userinfo`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok)
        throw new UnauthorizedException('Unable to fetch user info');

      const authUser = await response.json();

      if (!this.isAuthUser(authUser))
        throw new UnauthorizedException(`Invalid user info ${{ authUser }}`);

      return authUser;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private isAuthUser(data: any): boolean {
    return data && data.sub && typeof data.sub === 'string';
  }
}
