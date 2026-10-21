import { ApiProperty } from '@nestjs/swagger';

const ERRORS_SCHEMA = {
  type: 'object' as const,
  additionalProperties: {
    type: 'array',
    items: { type: 'string' },
  },
};

function defineName(target: { name: string }, name: string) {
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

export const ApiDataResponse = <T>(dataType: T) =>
  dataResponse(dataType, false);

export const ApiDataListResponse = <T>(dataType: T) =>
  dataResponse(dataType, true);

export class ApiErrorResponse {
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
    nullable: true,
    example: { name: ['Минимальная длина 3 символа'] },
  })
  errors: Record<string, string[]> | null;
}
