import { PartialType } from '@nestjs/swagger';
import { CreateJambHoleDto } from './create-jamb-hole.dto';

export class UpdateJambHoleDto extends PartialType(CreateJambHoleDto) {}
