import { Module } from '@nestjs/common';
import { JambHolesService } from './jamb-holes.service';
import { JambHolesController } from './jamb-holes.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [JambHolesController],
  providers: [JambHolesService],
})
export class JambHolesModule {}
