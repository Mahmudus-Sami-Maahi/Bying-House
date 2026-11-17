import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { requestContext } from '../request-context.js';

export const REQUEST_ID_HEADER = 'x-request-id';

// Accept a caller-supplied ID (e.g. from Next.js) only if it is short and safe
// to write into logs and headers.
const SAFE_REQUEST_ID = /^[A-Za-z0-9._-]{8,100}$/;

/**
 * Gives every request an ID, returns it in the `X-Request-Id` response header,
 * and makes it available to logs and error responses for that request.
 */
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header(REQUEST_ID_HEADER);
  const requestId = incoming && SAFE_REQUEST_ID.test(incoming) ? incoming : randomUUID();

  res.setHeader('X-Request-Id', requestId);
  requestContext.run({ requestId }, next);
}
