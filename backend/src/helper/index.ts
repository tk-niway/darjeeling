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
