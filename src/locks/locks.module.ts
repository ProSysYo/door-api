import { Module } from '@nestjs/common';
import { LocksService } from './locks.service';
import { LocksController } from './locks.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [LocksController],
  providers: [LocksService],
})
export class LocksModule {}
