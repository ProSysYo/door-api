import { PartialType } from '@nestjs/swagger';
import { CreateInsideFinishDto } from './create-inside-finish.dto';

export class UpdateInsideFinishDto extends PartialType(CreateInsideFinishDto) {}
