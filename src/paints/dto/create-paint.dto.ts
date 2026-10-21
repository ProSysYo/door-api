import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePaintDto {
  @ApiProperty({ description: 'Название покраски', example: 'бетон' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Минимальная длина 3 символа' })
  name: string;
}
