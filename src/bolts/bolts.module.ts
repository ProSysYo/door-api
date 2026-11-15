import { Module } from '@nestjs/common';
import { BoltsService } from './bolts.service';
import { BoltsController } from './bolts.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [BoltsController],
  providers: [BoltsService],
})
export class BoltsModule {}
