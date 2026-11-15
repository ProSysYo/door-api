import { Module } from '@nestjs/common';
import { EarsService } from './ears.service';
import { EarsController } from './ears.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [EarsController],
  providers: [EarsService],
})
export class EarsModule {}
