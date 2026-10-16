import { PartialType } from '@nestjs/swagger';
import { CreateKnobDto } from './create-knob.dto';

export class UpdateKnobDto extends PartialType(CreateKnobDto) {}
