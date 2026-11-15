import { Module } from '@nestjs/common';
import { PeepholesService } from './peepholes.service';
import { PeepholesController } from './peepholes.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PeepholesController],
  providers: [PeepholesService],
})
export class PeepholesModule {}
