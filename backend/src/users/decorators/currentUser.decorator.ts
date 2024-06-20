import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/generated/user/user.model';
import { UtilsService } from 'src/utils/utils.service';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    const utilsService = new UtilsService();
    return utilsService.convertReq(context).user;
  },
);
