import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/config/config.interface';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class RefererGuard implements CanActivate {
  constructor(
    private configService: ConfigService<IConfig, true>,
    private utilsService: UtilsService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = this.utilsService.convertReq(context);

    const referer = request.headers.referer;

    if (!referer || referer === this.configService.get<string>('frontendUrl'))
      throw new BadRequestException('リクエストは許可されていません。');

    return true;
  }
}
