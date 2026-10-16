import { Module } from '@nestjs/common';
import { KnobsService } from './knobs.service';
import { KnobsController } from './knobs.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [KnobsController],
  providers: [KnobsService],
})
export class KnobsModule {}
