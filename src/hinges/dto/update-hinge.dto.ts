import { PartialType } from '@nestjs/swagger';
import { CreateHingeDto } from './create-hinge.dto';

export class UpdateHingeDto extends PartialType(CreateHingeDto) {}
