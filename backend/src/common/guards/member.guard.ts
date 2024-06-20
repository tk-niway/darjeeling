import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class MemberGuard implements CanActivate {
  constructor(private utilsService: UtilsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = this.utilsService.convertReq(context);

    if (!user || !user.isActive)
      throw new UnauthorizedException('アクセスが拒否されました。');

    return true;
  }
}
