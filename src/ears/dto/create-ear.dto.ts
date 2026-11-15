import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateEarDto {
  @ApiProperty({ description: 'Уши', example: '80x40x6шт' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Минимальная длина 3 символа' })
  name: string;
}
