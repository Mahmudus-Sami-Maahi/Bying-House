import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';
import { ResponseEnvelopeInterceptor } from './common/interceptors/response-envelope.interceptor.js';
import { createValidationPipe } from './common/pipes/create-validation-pipe.js';
import { validateEnv } from './config/validate-env.js';
import { PrismaModule } from './infrastructure/prisma/prisma.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    // Env files are loaded before bootstrap (see main.ts); this validates them.
    ConfigModule.forRoot({ isGlobal: true, cache: true, ignoreEnvFile: true, validate: validateEnv }),
    PrismaModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_PIPE, useFactory: createValidationPipe },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseEnvelopeInterceptor },
  ],
})
export class AppModule {}
