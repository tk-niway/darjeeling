import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserModel implements User {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  auth0Id!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  isActive!: boolean;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;
}
