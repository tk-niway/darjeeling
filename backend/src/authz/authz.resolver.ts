import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthzService } from 'src/authz/authz.service';
import { Token } from 'src/authz/decorators/token.decorator';
import { User } from 'src/generated/user/user.model';
import { Public } from 'src/authz/decorators/public.decorator';

@Resolver((of: any) => User)
export class AuthzResolver {
  constructor(private readonly authzService: AuthzService) {}

  @Public()
  @Query((returns) => User)
  async signup(@Token() token: string): Promise<User> {
    return this.authzService.signup(token);
  }

  @Public()
  @Query((returns) => User)
  async signin(@Token() token: string): Promise<User> {
    return this.authzService.signin(token);
  }
}
