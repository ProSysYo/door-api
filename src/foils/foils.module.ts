import { Module } from '@nestjs/common';
import { FoilsService } from './foils.service';
import { FoilsController } from './foils.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [FoilsController],
  providers: [FoilsService],
})
export class FoilsModule {}
