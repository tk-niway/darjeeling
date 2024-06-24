import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UtilsService } from 'src/utils/utils.service';

export const Token = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const utilsService = new UtilsService();
    const request = utilsService.convertReq(context);

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type === 'Bearer' && !token) {
      console.error('Token not found', token);
      throw new Error('Token not found');
    }

    return token;
  },
);
