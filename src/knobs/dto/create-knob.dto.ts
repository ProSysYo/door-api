import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateKnobDto {
  @ApiProperty({
    description: 'Имя ручки',
    example: 'Основная ручка',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {message: 'Минимальная длина 3'})
  name: string;
}
