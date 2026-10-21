import { ApiProperty } from '@nestjs/swagger';

/**
 * Все ответы API завёрнуты в единый конверт { data, error, errors }:
 * его добавляет ResponseInterceptor при успехе и AllExceptionsFilter при ошибке.
 *
 * Swagger про конверт ничего не знает: без этих классов в документации
 * был бы описан «голый» Paint, хотя по факту приходит { data: Paint, ... }.
 *
 * Использование:
 *   @ApiCreatedResponse({ type: ApiDataResponse(Paint) })
 *   @ApiOkResponse({ type: ApiDataListResponse(Paint) })
 *   @ApiNotFoundResponse({ type: ApiErrorResponse })
 */

const ERRORS_SCHEMA = {
  type: 'object' as const,
  additionalProperties: {
    type: 'array',
    items: { type: 'string' },
  },
};

function defineName(target: { name: string }, name: string) {
  // Swagger берёт имя схемы из name класса, поэтому задаём его явно,
  // иначе PaintResponse и KnobResponse схлопнулись бы в одну схему.
  Object.defineProperty(target, 'name', { value: name });
}

function dataResponse<T>(dataType: T, many: boolean) {
  const modelName =
    typeof dataType === 'function'
      ? (dataType as unknown as { name: string }).name
      : String(dataType);

  class DataResponse {
    @ApiProperty({ type: dataType as never, isArray: many, nullable: true })
    data: T | null;

    @ApiProperty({ type: String, nullable: true, example: null })
    error: string | null;

    @ApiProperty({ ...ERRORS_SCHEMA, nullable: true, example: null })
    errors: Record<string, string[]> | null;
  }

  defineName(
    DataResponse,
    many ? `${modelName}ListResponse` : `${modelName}Response`,
  );

  return DataResponse;
}

/** Успешный ответ с одним объектом: { data: Paint, error: null, errors: null } */
export const ApiDataResponse = <T>(dataType: T) =>
  dataResponse(dataType, false);

/** Успешный ответ со списком: { data: Paint[], error: null, errors: null } */
export const ApiDataListResponse = <T>(dataType: T) =>
  dataResponse(dataType, true);

/** Ответ с ошибкой: { data: null, error: 'Цвет покраски не найден', errors: null } */
export class ApiErrorResponse {
  // В OpenAPI 3.0 нет отдельного типа null, поэтому data описываем
  // как пустой объект с nullable: true — в ответе он всегда null.
  @ApiProperty({
    type: 'object',
    properties: {},
    nullable: true,
    example: null,
  })
  data: null;

  @ApiProperty({ type: String, example: 'Цвет покраски не найден' })
  error: string;

  @ApiProperty({ ...ERRORS_SCHEMA, nullable: true, example: null })
  errors: Record<string, string[]> | null;
}

/** Ответ с ошибкой валидации: { data: null, error: 'Валидация не пройдена', errors: { name: [...] } } */
export class ApiValidationErrorResponse {
  @ApiProperty({
    type: 'object',
    properties: {},
    nullable: true,
    example: null,
  })
  data: null;

  @ApiProperty({ type: String, example: 'Валидация не пройдена' })
  error: string;

  @ApiProperty({
    ...ERRORS_SCHEMA,
    // errors заполнен при ошибке валидации тела и равен null,
    // когда 400 пришёл из-за нечислового id
    nullable: true,
    example: { name: ['Минимальная длина 3 символа'] },
  })
  errors: Record<string, string[]> | null;
}
