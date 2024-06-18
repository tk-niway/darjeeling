import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/authz/decorators/public.decorator';
import { convertReq, convertRes } from 'src/utils';

@Injectable()
export class AuthzGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return convertReq(context);
  }

  getResponse(context: ExecutionContext) {
    return convertRes(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    // The user's token is expired
    if (!user || info == 'TokenExpiredError: jwt expired')
      throw new UnauthorizedException(info.name);

    return super.handleRequest(err, user, info, context, status);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    if (
      !request?.headers?.authorization ||
      request.headers.authorization === ''
    ) {
      request.user = {};

      return true;
    }

    return super.canActivate(context);
  }
}
