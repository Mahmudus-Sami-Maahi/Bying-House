import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, type Observable } from 'rxjs';

const RAW_RESPONSE = 'app:raw-response';

/** Skip the `{ data }` envelope for a handler or controller (e.g. health checks). */
export const RawResponse = () => SetMetadata(RAW_RESPONSE, true);

/** A list result with paging information, sent as `{ data: items, meta }`. */
export class PaginatedResult<T> {
  constructor(
    readonly items: T[],
    readonly meta: { page: number; pageSize: number; total: number; totalPages: number },
  ) {}
}

/** Wraps successful responses as `{ data }` or `{ data, meta }`. */
@Injectable()
export class ResponseEnvelopeInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const raw = this.reflector.getAllAndOverride<boolean>(RAW_RESPONSE, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (raw) return next.handle();

    return next.handle().pipe(
      map((value: unknown) => {
        if (value === undefined) return value; // 204 No Content
        if (value instanceof PaginatedResult) return { data: value.items, meta: value.meta };
        return { data: value };
      }),
    );
  }
}
