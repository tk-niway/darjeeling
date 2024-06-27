import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientUnknownRequestError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error({ exception });
  }
}
