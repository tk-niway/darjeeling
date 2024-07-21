import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private utilsService: UtilsService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    return this.utilsService.convertReq(context);
  }

  getResponse(context: ExecutionContext) {
    return this.utilsService.convertRes(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    // The user's token is expired
    if (!user || info == 'TokenExpiredError: jwt expired') {
      //throw new UnauthorizedException(info.name);
      // !fIXME: This is a temporary fix to prevent the server from crashing
      console.error('TokenExpiredError: jwt expired');
      return {};
    }

    return super.handleRequest(err, user, info, context, status);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = this.utilsService.convertReq(context);

    // If the request does not have an authorization header, the user is guest
    if (
      !request.headers.authorization ||
      request.headers.authorization === ''
    ) {
      request.user = {};

      return true;
    }

    // If the request has an authorization header, the request proceeds to validation by the JwtAuthGuard
    return super.canActivate(context);
  }
}
