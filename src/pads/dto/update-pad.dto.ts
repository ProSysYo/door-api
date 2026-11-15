import { PartialType } from '@nestjs/swagger';
import { CreatePadDto } from './create-pad.dto';

export class UpdatePadDto extends PartialType(CreatePadDto) {}
