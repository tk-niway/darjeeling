import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  GqlArgumentsHost,
  GqlContextType,
  GqlExceptionFilter,
} from '@nestjs/graphql';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter
  extends BaseExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  private message = 'Internal server error';

  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      this.handlingRest(exception, host);
      return;
    }

    if (host.getType<GqlContextType>() === 'graphql') {
      this.handlingGraphql(exception, host);
      return;
    }

    return exception;
  }

  private handlingGraphql(exception: unknown, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host);
    const http = ctx.switchToHttp();
    const request = http.getRequest();
    const reply = http.getNext().reply;

    if (exception instanceof HttpException) {
      const error = exception.getResponse();
      return reply.code(exception.getStatus()).send({
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: [error],
      });
    } else {
      return reply.code(500).send({
        timestamp: new Date().toISOString(),
        path: '/graphql',
        errors: [this.message],
      });
    }
  }

  private handlingRest(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const error = exception.getResponse();
      response.status(status).send({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: [error],
      });
    } else {
      response.status(500).send({
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: request.url,
        errors: [this.message],
      });
    }
  }
}
