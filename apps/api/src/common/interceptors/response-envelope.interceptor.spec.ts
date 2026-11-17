import type { CallHandler, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, of } from 'rxjs';
import { PaginatedResult, ResponseEnvelopeInterceptor } from './response-envelope.interceptor.js';

function run(value: unknown, raw = false) {
  const reflector = { getAllAndOverride: () => raw } as unknown as Reflector;
  const interceptor = new ResponseEnvelopeInterceptor(reflector);
  const context = { getHandler: () => undefined, getClass: () => undefined } as unknown as ExecutionContext;
  const next: CallHandler = { handle: () => of(value) };
  return firstValueFrom(interceptor.intercept(context, next));
}

describe('ResponseEnvelopeInterceptor', () => {
  it('wraps a value as { data }', async () => {
    expect(await run({ id: 1 })).toEqual({ data: { id: 1 } });
  });

  it('wraps a paginated result as { data, meta }', async () => {
    const meta = { page: 1, pageSize: 20, total: 1, totalPages: 1 };
    expect(await run(new PaginatedResult([{ id: 1 }], meta))).toEqual({ data: [{ id: 1 }], meta });
  });

  it('leaves undefined untouched (204 No Content)', async () => {
    expect(await run(undefined)).toBeUndefined();
  });

  it('skips the envelope for @RawResponse handlers', async () => {
    expect(await run({ status: 'ok' }, true)).toEqual({ status: 'ok' });
  });
});
