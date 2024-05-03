import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export function convertReq(context: ExecutionContext) {
  const gqlContext = GqlExecutionContext.create(context);

  const ctx = gqlContext.getContext();

  return ctx.req || context.switchToHttp().getRequest<Request>();
}

export function convertRes(context: ExecutionContext) {
  const gqlContext = GqlExecutionContext.create(context);

  const ctx = gqlContext.getContext();

  return ctx.req || context.switchToHttp().getResponse<Response>();
}
