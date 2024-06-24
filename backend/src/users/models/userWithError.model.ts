import { Field, ObjectType } from '@nestjs/graphql';
import { UserError } from 'src/lib/models/userError.model';
import { UserModel } from 'src/users/models/user.model';

// @ObjectType()
// export class UserWithError extends UserErrorConnection(User) {}

@ObjectType()
export class UserWithError {
  @Field((type) => UserModel, { nullable: true })
  user: UserModel;

  @Field((type) => [UserError], { nullable: true })
  userErrors: UserError[];
}
