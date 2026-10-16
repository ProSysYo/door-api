import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKnobDto {
  @ApiProperty({
    description: 'Имя ручки',
    example: 'Основная ручка',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
