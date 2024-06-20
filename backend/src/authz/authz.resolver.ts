import { Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthzService } from 'src/authz/authz.service';
import { Token } from 'src/authz/decorators/token.decorator';
import { UserWithError } from 'src/users/models/userWithError.model';

@Resolver((of: any) => UserWithError)
export class AuthzResolver {
  constructor(private readonly authzService: AuthzService) {}

  @Mutation((returns) => UserWithError)
  async signup(@Token() token: string): Promise<UserWithError> {
    return await this.authzService.signup(token);
  }

  @Query((returns) => UserWithError)
  async signin(@Token() token: string): Promise<UserWithError> {
    return await this.authzService.signin(token);
  }
}
