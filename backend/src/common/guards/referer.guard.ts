import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class RefererGuard implements CanActivate {
  constructor(private allowedReferers: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const referer = request.headers.referer;

    if (!referer || !this.allowedReferers.includes(referer)) {
      throw new BadRequestException('リクエストは許可されていません。');
    }

    return true;
  }
}
