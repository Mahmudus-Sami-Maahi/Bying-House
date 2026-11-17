import { StandardSchemaValidationPipe } from '@nestjs/common';
import { ValidationFailedError } from '../errors/app-error.js';

/**
 * Validates every `@Body/@Query/@Param({ schema })` against its Zod schema and
 * reports failures as 422 VALIDATION_FAILED with one entry per invalid field.
 */
export function createValidationPipe(): StandardSchemaValidationPipe {
  return new StandardSchemaValidationPipe({
    exceptionFactory: (issues) =>
      new ValidationFailedError(
        issues.map((issue) => {
          const path = issue.path
            ?.map((segment) => (typeof segment === 'object' ? segment.key : segment))
            .join('.');
          return path ? { path, message: issue.message } : { message: issue.message };
        }),
      ),
  });
}
