import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';
import { UserModel } from 'src/users/models/user.model';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserModel => {
    const utilsService = new UtilsService();
    return utilsService.convertReq(context).user;
  },
);
