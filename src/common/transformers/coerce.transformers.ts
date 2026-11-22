import { TransformFnParams } from 'class-transformer';

/**
 * Колбэки для @Transform в DTO.
 *
 * Нужны потому, что контролируемый input на фронте всегда отдаёт строку,
 * а валидатор должен видеть тот тип, который объявлен в поле DTO.
 * Работают только при transform: true в ValidationPipe.
 */

/** Строка -> number. Пустая строка превращается в NaN и отваливается на @IsNumber/@IsInt */
export const toNumber = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? Number(value.trim()) : value;

/**
 * Строка -> number, при этом '' / undefined считаются «поле не заполнено»
 * и пропускаются дальше на @IsOptional. null сохраняем как null,
 * чтобы через PATCH можно было сбросить значение в null.
 */
export const toNumberOrUndefined = ({
  value,
}: TransformFnParams): unknown => {
  if (value === '' || value === undefined) return undefined;

  return typeof value === 'string' ? Number(value.trim()) : value;
};

/** ISO-строка ('2026-11-22') -> Date */
export const toDate = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' && value.trim() !== '' ? new Date(value) : value;
