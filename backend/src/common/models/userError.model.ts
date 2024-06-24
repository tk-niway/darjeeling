import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UserError')
export class UserError {
  @Field(() => String)
  message: string;

  @Field({ nullable: true })
  field: string;
}
