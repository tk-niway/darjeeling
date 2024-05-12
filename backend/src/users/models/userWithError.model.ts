import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/generated/user/user.model';
import { UserError } from 'src/lib/models/userError.model';

// @ObjectType()
// export class UserWithError extends UserErrorConnection(User) {}

@ObjectType()
export class UserWithError {
  @Field((type) => User, { nullable: true })
  user: User;

  @Field((type) => [UserError], { nullable: true })
  userErrors: UserError[];
}
