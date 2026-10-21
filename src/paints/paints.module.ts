import { Module } from '@nestjs/common';
import { PaintsService } from './paints.service';
import { PaintsController } from './paints.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PaintsController],
  providers: [PaintsService],
})
export class PaintsModule {}
