import { Module } from '@nestjs/common';
import { HingesService } from './hinges.service';
import { HingesController } from './hinges.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [HingesController],
  providers: [HingesService],
})
export class HingesModule {}
