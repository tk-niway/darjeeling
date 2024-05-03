import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { convertReq } from 'src/helper';

export const Token = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = convertReq(context);

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type === 'Bearer' && !token) {
      console.error('Token not found', token);
      throw new Error('Token not found');
    }

    return token;
  },
);
