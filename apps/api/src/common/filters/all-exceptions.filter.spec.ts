import { type ArgumentsHost, HttpStatus, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import type { HttpAdapterHost } from '@nestjs/core';
import { AppError, ConflictError, ValidationFailedError } from '../errors/app-error.js';
import { requestContext } from '../request-context.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';

function setup() {
  const reply = vi.fn();
  const filter = new AllExceptionsFilter({ httpAdapter: { reply } } as unknown as HttpAdapterHost);
  const host = { switchToHttp: () => ({ getResponse: () => ({}) }) } as unknown as ArgumentsHost;
  const run = (exception: unknown) =>
    requestContext.run({ requestId: 'req-test-0001' }, () => filter.catch(exception, host));
  const lastReply = () => {
    const [, body, status] = reply.mock.calls.at(-1) as [unknown, any, number];
    return { body, status };
  };
  return { run, lastReply };
}

describe('AllExceptionsFilter', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    errorSpy = vi.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
  });
  afterEach(() => vi.restoreAllMocks());

  it('maps an AppError to its status, code, message and details', () => {
    const { run, lastReply } = setup();
    run(new ValidationFailedError([{ path: 'email', message: 'Invalid email' }]));
    expect(lastReply()).toEqual({
      status: 422,
      body: {
        error: {
          code: 'VALIDATION_FAILED',
          message: 'The request contains invalid data.',
          details: [{ path: 'email', message: 'Invalid email' }],
          requestId: 'req-test-0001',
        },
      },
    });
  });

  it('maps a Nest HttpException to a stable code', () => {
    const { run, lastReply } = setup();
    run(new NotFoundException('Cannot GET /api/v1/nothing'));
    expect(lastReply()).toEqual({
      status: 404,
      body: { error: { code: 'NOT_FOUND', message: 'Cannot GET /api/v1/nothing', requestId: 'req-test-0001' } },
    });
  });

  it('hides internals of unexpected errors and logs them', () => {
    const { run, lastReply } = setup();
    run(new Error('connection string postgres://secret@db leaked'));
    const { status, body } = lastReply();
    expect(status).toBe(500);
    expect(body.error.code).toBe('INTERNAL_ERROR');
    expect(body.error.message).not.toContain('secret');
    expect(errorSpy).toHaveBeenCalledOnce();
  });

  it('does not log client errors as server errors', () => {
    const { run } = setup();
    run(new ConflictError());
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it.each([
    ['P2002', 409, 'DUPLICATE'],
    ['P2003', 409, 'CONFLICT'],
    ['P2025', 404, 'NOT_FOUND'],
  ])('maps Prisma error %s to %i %s', (prismaCode, status, code) => {
    const { run, lastReply } = setup();
    const error = Object.assign(new Error('prisma'), { name: 'PrismaClientKnownRequestError', code: prismaCode });
    run(error);
    expect(lastReply().status).toBe(status);
    expect(lastReply().body.error.code).toBe(code);
  });

  it('maps a Prisma initialization error to 503', () => {
    const { run, lastReply } = setup();
    run(Object.assign(new Error('cannot reach db'), { name: 'PrismaClientInitializationError' }));
    expect(lastReply().status).toBe(503);
    expect(lastReply().body.error.code).toBe('SERVICE_UNAVAILABLE');
  });

  it.each([
    ['entity.parse.failed', 400, 'BAD_REQUEST'],
    ['entity.too.large', 413, 'PAYLOAD_TOO_LARGE'],
  ])('maps body parser error %s to %i', (type, status, code) => {
    const { run, lastReply } = setup();
    run(Object.assign(new Error('parser'), { type, status }));
    expect(lastReply().status).toBe(status);
    expect(lastReply().body.error.code).toBe(code);
  });

  it('passes Terminus health results through unchanged', () => {
    const { run, lastReply } = setup();
    const result = { status: 'error', info: {}, error: { database: { status: 'down' } }, details: {} };
    run(new ServiceUnavailableException(result));
    expect(lastReply()).toEqual({ status: HttpStatus.SERVICE_UNAVAILABLE, body: result });
  });

  it('uses a generic message for 5xx HttpExceptions', () => {
    const { run, lastReply } = setup();
    run(new AppError('UPSTREAM', 'Mail server down', HttpStatus.BAD_GATEWAY));
    expect(lastReply().body.error.message).toBe('Mail server down');
    run(new ServiceUnavailableException('db host 10.0.0.5 unreachable'));
    expect(lastReply().body.error.message).not.toContain('10.0.0.5');
  });
});
