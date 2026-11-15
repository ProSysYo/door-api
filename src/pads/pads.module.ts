import { Module } from '@nestjs/common';
import { PadsService } from './pads.service';
import { PadsController } from './pads.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PadsController],
  providers: [PadsService],
})
export class PadsModule {}
