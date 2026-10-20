import {
  BadRequestException,
  Injectable,
  ValidationPipe,
  ValidationError,
  type ValidationPipeOptions,
} from '@nestjs/common';

function groupErrors(errors: ValidationError[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  for (const err of errors) {
    const field = err.property;

    if (err.children && err.children.length > 0) {
      const childErrors = groupErrors(err.children);
      for (const [key, msgs] of Object.entries(childErrors)) {
        result[`${field}.${key}`] = msgs;
      }
    }

    if (err.constraints) {
      result[field] = [
        ...Object.values(err.constraints),
        ...(result[field] || []),
      ];
    }
  }

  return result;
}

function exceptionFactory(errors: ValidationError[]) {
  const grouped = groupErrors(errors);

  return new BadRequestException({
    errors: grouped,
    message: 'Валидация не пройдена',
  });
}

@Injectable()
export class ValidationConfigPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory,
      ...options,
    });
  }
}
