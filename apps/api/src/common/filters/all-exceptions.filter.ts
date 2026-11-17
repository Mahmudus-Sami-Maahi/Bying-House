import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppError, type ErrorDetail } from '../errors/app-error.js';
import { HTTP_STATUS_CODES, type ErrorResponseBody } from '../errors/error-response.js';
import { currentRequestId } from '../request-context.js';

interface NormalizedError {
  status: number;
  code: string;
  message: string;
  details?: ErrorDetail[];
}

const GENERIC_SERVER_MESSAGE = 'An unexpected error occurred. Please try again later.';

/**
 * Turns every thrown value into the standard error envelope:
 * `{ error: { code, message, details?, requestId } }`.
 * Server errors are logged with their stack; their internals never reach the client.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.adapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<unknown>();
    const requestId = currentRequestId();

    // Health checks keep Terminus' own body, which tools and Docker expect.
    if (isTerminusResult(exception)) {
      httpAdapter.reply(response, exception.getResponse(), exception.getStatus());
      return;
    }

    const normalized = normalize(exception);

    if (normalized.status >= 500) {
      this.logger.error(
        `${normalized.code}: ${describe(exception)}`,
        exception instanceof Error ? exception.stack : undefined,
        { requestId },
      );
    }

    const body: ErrorResponseBody = {
      error: {
        code: normalized.code,
        message: normalized.message,
        ...(normalized.details?.length ? { details: normalized.details } : {}),
        ...(requestId ? { requestId } : {}),
      },
    };
    httpAdapter.reply(response, body, normalized.status);
  }
}

function normalize(exception: unknown): NormalizedError {
  if (exception instanceof AppError) {
    return {
      status: exception.status,
      code: exception.code,
      message: exception.message,
      details: exception.details,
    };
  }

  if (exception instanceof HttpException) {
    const status = exception.getStatus();
    return {
      status,
      code: HTTP_STATUS_CODES[status] ?? (status >= 500 ? 'INTERNAL_ERROR' : 'REQUEST_FAILED'),
      message: status >= 500 ? GENERIC_SERVER_MESSAGE : httpExceptionMessage(exception),
    };
  }

  // Body parser errors (malformed JSON, body too large) are thrown before Nest
  // routes the request and carry an HTTP status.
  const parserStatus = bodyParserStatus(exception);
  if (parserStatus) {
    return {
      status: parserStatus,
      code: HTTP_STATUS_CODES[parserStatus] ?? 'BAD_REQUEST',
      message:
        parserStatus === HttpStatus.PAYLOAD_TOO_LARGE
          ? 'The request body is too large.'
          : 'The request body could not be read. Send valid JSON.',
    };
  }

  const prisma = prismaError(exception);
  if (prisma) {
    return prisma;
  }

  return { status: HttpStatus.INTERNAL_SERVER_ERROR, code: 'INTERNAL_ERROR', message: GENERIC_SERVER_MESSAGE };
}

function httpExceptionMessage(exception: HttpException): string {
  const body = exception.getResponse();
  if (typeof body === 'string') return body;
  const message = (body as { message?: unknown }).message;
  if (typeof message === 'string') return message;
  if (Array.isArray(message)) return message.join('; ');
  return exception.message;
}

function bodyParserStatus(exception: unknown): number | undefined {
  if (typeof exception !== 'object' || exception === null) return undefined;
  const { type, status } = exception as { type?: unknown; status?: unknown };
  const isParserError = typeof type === 'string' && (type === 'entity.parse.failed' || type === 'entity.too.large');
  return isParserError && typeof status === 'number' ? status : undefined;
}

/** Maps Prisma errors by their documented codes, without importing generated types. */
function prismaError(exception: unknown): NormalizedError | undefined {
  if (!(exception instanceof Error)) return undefined;

  if (exception.name === 'PrismaClientKnownRequestError') {
    const code = (exception as Error & { code?: string }).code;
    switch (code) {
      case 'P2002':
        return { status: 409, code: 'DUPLICATE', message: 'A record with the same unique value already exists.' };
      case 'P2003':
        return { status: 409, code: 'CONFLICT', message: 'The record is still referenced by other data.' };
      case 'P2025':
        return { status: 404, code: 'NOT_FOUND', message: 'The requested resource was not found.' };
      default:
        return undefined;
    }
  }

  if (exception.name === 'PrismaClientInitializationError') {
    return { status: 503, code: 'SERVICE_UNAVAILABLE', message: 'The service is temporarily unavailable.' };
  }

  return undefined;
}

function isTerminusResult(exception: unknown): exception is HttpException {
  if (!(exception instanceof HttpException)) return false;
  const body = exception.getResponse();
  return typeof body === 'object' && body !== null && 'status' in body && 'details' in body && 'info' in body;
}

function describe(exception: unknown): string {
  if (exception instanceof Error) return `${exception.name}: ${exception.message}`;
  return String(exception);
}
