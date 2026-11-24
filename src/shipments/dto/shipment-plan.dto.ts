import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { toDate } from '../../common/transformers/coerce.transformers';

export class ShipmentPlanDto {
  @ApiProperty({
    description: 'Дата отгрузки (YYYY-MM-DD)',
    example: '2026-11-15',
  })
  @Transform(toDate)
  @IsDate({ message: 'Дата должна быть валидной датой' })
  date: Date;

  @ApiProperty({
    description: 'Список ID заказов для назначения даты отгрузки',
    example: [1, 2, 3],
    required: false,
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (value === '') return [];
    if (value !== undefined && value !== null) return [Number(value)];
    return [];
  })
  @IsOptional()
  @IsArray({ message: 'setOrderIds должен быть массивом' })
  @IsInt({ each: true, message: 'ID заказа должен быть числом' })
  @IsPositive({ each: true, message: 'ID заказа должен быть положительным' })
  setOrderIds?: number[];

  @ApiProperty({
    description: 'Список ID заказов для снятия даты отгрузки',
    example: [4, 5],
    required: false,
  })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (value === '') return [];
    if (value !== undefined && value !== null) return [Number(value)];
    return [];
  })
  @IsOptional()
  @IsArray({ message: 'removeOrderIds должен быть массивом' })
  @IsInt({ each: true, message: 'ID заказа должен быть числом' })
  @IsPositive({ each: true, message: 'ID заказа должен быть положительным' })
  removeOrderIds?: number[];
}
