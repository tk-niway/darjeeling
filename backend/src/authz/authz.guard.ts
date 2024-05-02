import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/authz/decorators/public.decorator';

@Injectable()
export class AuthzGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
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

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
