import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('PageInfo')
export class PageInfo {
  @Field()
  startCursor: string;

  @Field()
  endCursor: string;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}
