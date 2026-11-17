import type { Request, Response } from 'express';
import { currentRequestId } from '../request-context.js';
import { requestIdMiddleware } from './request-id.middleware.js';

function run(incoming?: string) {
  const req = { header: () => incoming } as unknown as Request;
  const setHeader = vi.fn();
  const res = { setHeader } as unknown as Response;
  let seenInsideRequest: string | undefined;
  requestIdMiddleware(req, res, () => {
    seenInsideRequest = currentRequestId();
  });
  return { header: setHeader.mock.calls[0]?.[1] as string, seenInsideRequest };
}

describe('requestIdMiddleware', () => {
  it('generates an ID and exposes it to the request context', () => {
    const { header, seenInsideRequest } = run();
    expect(header).toMatch(/^[0-9a-f-]{36}$/);
    expect(seenInsideRequest).toBe(header);
  });

  it('keeps a safe caller-supplied ID', () => {
    expect(run('web-7f3a9c1e2b').header).toBe('web-7f3a9c1e2b');
  });

  it.each(['short', 'has spaces in it', 'x'.repeat(101), 'line\nbreak-injection'])(
    'replaces an unsafe ID (%j)',
    (unsafe) => {
      expect(run(unsafe).header).not.toBe(unsafe);
    },
  );
});
