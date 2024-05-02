import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Token = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context);

    const ctx = gqlContext.getContext();

    const request = ctx.req || context.switchToHttp().getRequest<Request>();

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type === 'Bearer' && !token) {
      console.error('Token not found', token);
      throw new Error('Token not found');
    }

    return token;
  },
);
