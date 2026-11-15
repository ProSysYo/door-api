import { Module } from '@nestjs/common';
import { OutsideFinishesService } from './outside-finishes.service';
import { OutsideFinishesController } from './outside-finishes.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [OutsideFinishesController],
  providers: [OutsideFinishesService],
})
export class OutsideFinishesModule {}
