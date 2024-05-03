import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      this.handlingRest(exception, host);
      return;
    } 
    this.handlingGraphql(exception, host);
  }

  private handlingGraphql(exception: HttpException, host: ArgumentsHost) {
    const error = exception.getResponse();
    const ctx = GqlArgumentsHost.create(host);
    const http = ctx.switchToHttp();
    const request = http.getRequest();
    const reply = http.getNext().reply;

    return reply.code(exception.getStatus()).send({
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: [error],
    });
  }

  private handlingRest(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: [error],
    });
  }
}
