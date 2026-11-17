import { describeDbError } from './prisma.service.js';

describe('describeDbError', () => {
  it('uses the driver code from the error cause chain and skips Prisma boilerplate', () => {
    const error = new Error('\nInvalid `prisma.$queryRaw()` invocation:\n\n\nconnect ECONNREFUSED 127.0.0.1:5432', {
      cause: Object.assign(new Error('connect'), { code: 'ECONNREFUSED' }),
    });
    expect(describeDbError(error)).toBe('ECONNREFUSED: connect ECONNREFUSED 127.0.0.1:5432');
  });

  it('falls back to the code alone when the message has no detail', () => {
    const error = Object.assign(new Error('\nInvalid `prisma.$queryRaw()` invocation:\n\n\n'), { code: '28P01' });
    expect(describeDbError(error)).toBe('28P01');
  });

  it('handles non-Error values', () => {
    expect(describeDbError('boom')).toBe('boom');
  });
});
