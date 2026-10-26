import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePackagingDto {
    @ApiProperty({description: "Название упаковки", example: "Упаковка софт"})
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {message: "Минимальная длина 3 символа"})
    name: string
}