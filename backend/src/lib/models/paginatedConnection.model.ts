import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from 'src/lib/models/pageInfo.model';

export function PaginatedConnection<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  class AbstractConnectionType {
    @Field((type) => Int)
    totalCount: number;

    @Field((type) => [AbstractEdgeType], { nullable: true })
    edges: AbstractEdgeType[];

    @Field((type) => [classRef], { nullable: true })
    nodes: T[];

    @Field((type) => PageInfo)
    pageInfo: PageInfo;
  }

  @ObjectType(`${classRef.name}Edge`)
  abstract class AbstractEdgeType {
    @Field((type) => String)
    cursor: string;

    @Field((type) => classRef)
    node: T;
  }

  return AbstractConnectionType;
}
