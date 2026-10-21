import { PartialType } from '@nestjs/swagger';
import { CreatePaintDto } from './create-paint.dto';

export class UpdatePaintDto extends PartialType(CreatePaintDto) {}
