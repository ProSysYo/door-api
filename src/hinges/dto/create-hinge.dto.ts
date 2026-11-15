import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateHingeDto {
  @ApiProperty({ description: 'Название', example: 'name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Минимальная длина 3 символа' })
  name: string;
}
