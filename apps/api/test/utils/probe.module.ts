import { Body, Controller, Get, Module, Post } from '@nestjs/common';
import { z } from 'zod';
import { PaginatedResult } from '../../src/common/interceptors/response-envelope.interceptor.js';

/** Test-only endpoints that exercise validation, envelopes and error handling. */
const echoSchema = z.strictObject({
  name: z.string().min(2),
  email: z.email(),
});

@Controller('probe')
class ProbeController {
  @Post('echo')
  echo(@Body({ schema: echoSchema }) body: z.infer<typeof echoSchema>) {
    return body;
  }

  @Get('list')
  list() {
    return new PaginatedResult([{ id: 1 }], { page: 1, pageSize: 20, total: 1, totalPages: 1 });
  }

  @Get('crash')
  crash(): never {
    throw new Error('internal detail: password=hunter2');
  }
}

@Module({ controllers: [ProbeController] })
export class ProbeModule {}
