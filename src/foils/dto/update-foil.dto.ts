import { PartialType } from '@nestjs/swagger';
import { CreateFoilDto } from './create-foil.dto';

export class UpdateFoilDto extends PartialType(CreateFoilDto) {}
