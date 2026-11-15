import { PartialType } from '@nestjs/swagger';
import { CreateEarDto } from './create-ear.dto';

export class UpdateEarDto extends PartialType(CreateEarDto) {}
