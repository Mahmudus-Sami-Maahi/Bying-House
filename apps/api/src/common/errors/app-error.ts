import { HttpStatus } from '@nestjs/common';

/** A field-level problem returned in `error.details`. */
export interface ErrorDetail {
  path?: string;
  message: string;
}

/**
 * Base class for errors the API raises on purpose. `code` is a stable,
 * machine-readable identifier that clients can rely on; `message` is safe to
 * show to users.
 */
export class AppError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: HttpStatus,
    readonly details?: ErrorDetail[],
  ) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationFailedError extends AppError {
  constructor(details: ErrorDetail[]) {
    super('VALIDATION_FAILED', 'The request contains invalid data.', HttpStatus.UNPROCESSABLE_ENTITY, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'The requested resource was not found.') {
    super('NOT_FOUND', message, HttpStatus.NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(code = 'CONFLICT', message = 'The request conflicts with existing data.') {
    super(code, message, HttpStatus.CONFLICT);
  }
}
