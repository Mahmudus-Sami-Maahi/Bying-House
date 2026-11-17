import { AsyncLocalStorage } from 'node:async_hooks';

/** Per-request values available anywhere during that request. */
export interface RequestContext {
  requestId: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export function currentRequestId(): string | undefined {
  return requestContext.getStore()?.requestId;
}
