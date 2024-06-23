import { Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

@Injectable()
export class UtilsService {
  constructor() {}

  convertContext(context: ExecutionContext) {
    return GqlExecutionContext.create(context).getContext();
  }

  convertReq(context: ExecutionContext) {
    return (
      this.convertContext(context).req ||
      context.switchToHttp().getRequest<Request>()
    );
  }

  convertRes(context: ExecutionContext) {
    return (
      this.convertContext(context).req ||
      context.switchToHttp().getResponse<Response>()
    );
  }

  generateEdges<T extends { id: string | number }>(
    objects: T[],
  ): { node: T; cursor: string }[] {
    return objects.map((object) => ({
      node: object,
      cursor: object.id.toString(),
    }));
  }

  generateStartCursor<T>(edges: { node: T; cursor: string }[]) {
    return edges[0]?.cursor || '';
  }

  generateEndCursor<T>(edges: { node: T; cursor: string }[]) {
    return edges[edges.length - 1]?.cursor || '';
  }

  hasNextPage(skip: number, take: number, totalCount: number): boolean {
    return skip + take < totalCount;
  }

  hasPreviousPage(skip: number): boolean {
    return skip > 0;
  }

  generatePageInfo<T extends { id: string | number }>({
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
      hasNextPage: this.hasNextPage(skip, take, totalCount),
      hasPreviousPage: this.hasPreviousPage(skip),
      startCursor: this.generateStartCursor(edges),
      endCursor: this.generateEndCursor(edges),
    };
  }

  splitFilename(filename: string): { name: string; extension: string } {
    const dotIndex = filename.lastIndexOf('.');

    if (dotIndex === -1) return { name: filename, extension: '' }; // 拡張子がない場合

    return {
      name: filename.substring(0, dotIndex),
      extension: filename.substring(dotIndex + 1),
    };
  }
}
