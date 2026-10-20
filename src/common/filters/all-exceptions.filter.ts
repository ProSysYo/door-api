import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '../../generated/prisma/client.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let error: string | null = null;
    let errors: Record<string, string[]> | null = null;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          const target = exception.meta?.target;
          const targetStr =
            typeof target === 'string'
              ? target
              : Array.isArray(target)
                ? target.join(', ')
                : JSON.stringify(target);
          error = `Дублирующееся значение: ${targetStr}`;
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          error = 'Ресурс не найден';
          break;
        default:
          status = HttpStatus.BAD_REQUEST;
          error = exception.message;
      }
    } else if (
      exception &&
      typeof exception === 'object' &&
      'status' in exception &&
      'response' in exception
    ) {
      const nestException = exception as any;
      status = nestException.status;
      const res = nestException.response as any;

      // 1. Наша exceptionFactory возвращает { errors: {...}, message: '...' }
      if (res && typeof res === 'object' && res.errors) {
        errors = res.errors;
        error = res.message ?? 'Валидация не пройдена';
      }
      // 2. Стандартный ValidationPipe без кастомной фабрики
      else if (Array.isArray(res?.message)) {
        errors = this.groupErrors(res.message);
        error = 'Валидация не пройдена';
      }
      // 3. Стандартные NestJS-исключения: { message: '...', statusCode: 401 }
      else if (typeof res?.message === 'string') {
        error = res.message;
      }
      // 4. Объект без message — извлекаем полезные поля или сериализуем
      else if (res && typeof res === 'object') {
        if (res.type && typeof res.type === 'string') {
          error = res.type;
        } else if (res.message && typeof res.message === 'string') {
          error = res.message;
        } else {
          error = JSON.stringify(res);
        }
      }
      // 5. Fallback
      else {
        error = String(res);
      }
    } else {
      error = 'Внутренняя ошибка сервера';
    }

    response.status(status).json({
      data: null,
      error,
      errors,
    });
  }

  private groupErrors(messages: string[]): Record<string, string[]> {
    const grouped: Record<string, string[]> = {};

    for (const msg of messages) {
      const match = msg.match(/^property ([^ ]+) should not exist/);
      if (match) {
        const field = match[1].replaceAll('[', '').replaceAll(']', '');
        grouped[field] = [msg];
        continue;
      }

      const parts = msg.split(/\s+(?:must|should)\s+/i);
      if (parts.length > 1) {
        const field = parts[0].replaceAll('[', '').replaceAll(']', '');
        grouped[field] = grouped[field] || [];
        grouped[field].push(msg);
        continue;
      }

      grouped['_general'] = grouped['_general'] || [];
      grouped['_general'].push(msg);
    }

    return grouped;
  }
}
