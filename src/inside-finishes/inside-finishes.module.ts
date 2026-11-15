import { Module } from '@nestjs/common';
import { InsideFinishesService } from './inside-finishes.service';
import { InsideFinishesController } from './inside-finishes.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [InsideFinishesController],
  providers: [InsideFinishesService],
})
export class InsideFinishesModule {}
