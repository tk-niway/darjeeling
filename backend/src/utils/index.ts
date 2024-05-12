import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export function convertContext(context: ExecutionContext) {
  return GqlExecutionContext.create(context).getContext();
}

export function convertReq(context: ExecutionContext) {
  return (
    convertContext(context).req || context.switchToHttp().getRequest<Request>()
  );
}

export function convertRes(context: ExecutionContext) {
  return (
    convertContext(context).req ||
    context.switchToHttp().getResponse<Response>()
  );
}

export function generateEdges<T extends { id: string | number }>(
  objects: T[],
): { node: T; cursor: string }[] {
  return objects.map((object) => ({
    node: object,
    cursor: object.id.toString(),
  }));
}

export function generateStartCursor<T>(edges: { node: T; cursor: string }[]) {
  return edges[0]?.cursor || '';
}

export function generateEndCursor<T>(edges: { node: T; cursor: string }[]) {
  return edges[edges.length - 1]?.cursor || '';
}

export function hasNextPage(
  skip: number,
  take: number,
  totalCount: number,
): boolean {
  return skip + take < totalCount;
}

export function hasPreviousPage(skip: number): boolean {
  return skip > 0;
}

export function generatePageInfo<T extends { id: string | number }>({
  skip,
  take,
  totalCount,
  edges,
}: {
  skip: number;
  take: number;
  totalCount: number;
  edges: { node: T; cursor: string }[];
}): {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
} {
  return {
    hasNextPage: hasNextPage(skip, take, totalCount),
    hasPreviousPage: hasPreviousPage(skip),
    startCursor: generateStartCursor(edges),
    endCursor: generateEndCursor(edges),
  };
}
