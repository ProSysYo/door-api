import { PartialType } from '@nestjs/swagger';
import { CreatePeepholeDto } from './create-peephole.dto';

export class UpdatePeepholeDto extends PartialType(CreatePeepholeDto) {}
