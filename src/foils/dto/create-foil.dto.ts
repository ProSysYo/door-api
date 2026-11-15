import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateFoilDto {
  @ApiProperty({ description: 'Название пленки', example: 'бетон снежный' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Минимальная длина 3 символа' })
  name: string;
}

