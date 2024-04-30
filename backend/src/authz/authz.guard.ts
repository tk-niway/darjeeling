import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthzGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);

    const ctx = gqlContext.getContext();

    return ctx.req || context.switchToHttp().getRequest<Request>();
  }

  getResponse(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);

    const ctx = gqlContext.getContext();

    return ctx.req || context.switchToHttp().getResponse<Response>();
  }
}
