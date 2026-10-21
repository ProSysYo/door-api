import { Module } from '@nestjs/common';
import { PaintService } from './paints.service';
import { PaintController } from './paints.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PaintController],
  providers: [PaintService],
})
export class PaintModule {}
