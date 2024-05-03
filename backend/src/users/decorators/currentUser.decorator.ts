import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { convertReq } from 'src/helper';
import { User } from 'src/generated/user/user.model';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => convertReq(context).user,
);