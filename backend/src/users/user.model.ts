import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserModel {
  @Field((type) => ID, { description: 'User ID' })
  id: User['id'];

  @Field((type) => ID, { description: 'Auth0 ID' })
  auth0Id: User['auth0Id'];

  @Field((type) => String, { nullable: true, description: 'Email' })
  email?: User['email'];

  @Field((type) => String, { nullable: true, description: 'Name' })
  name?: User['name'];

  @Field((type) => Date, { description: 'Created at' })
  createdAt: User['createdAt'];

  @Field((type) => Date, { description: 'Updated at' })
  updatedAt: User['updatedAt'];
}
