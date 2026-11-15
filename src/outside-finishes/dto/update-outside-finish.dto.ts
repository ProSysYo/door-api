import { PartialType } from '@nestjs/swagger';
import { CreateOutsideFinishDto } from './create-outside-finish.dto';

export class UpdateOutsideFinishDto extends PartialType(CreateOutsideFinishDto) {}
