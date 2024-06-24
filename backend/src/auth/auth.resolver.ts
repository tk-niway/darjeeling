import { Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { Token } from 'src/common/decorators/token.decorator';
import { UserWithError } from 'src/users/models/userWithError.model';

@Resolver((of: any) => UserWithError)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => UserWithError)
  async signup(@Token() token: string): Promise<UserWithError> {
    return await this.authService.signup(token);
  }

  @Query((returns) => UserWithError)
  async signin(@Token() token: string): Promise<UserWithError> {
    return await this.authService.signin(token);
  }
}
