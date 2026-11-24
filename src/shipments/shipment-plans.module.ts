import { Module } from '@nestjs/common';
import { ShipmentPlansService } from './shipment-plans.service';
import { ShipmentPlansController } from './shipment-plans.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ShipmentPlansController],
  providers: [ShipmentPlansService],
})
export class ShipmentPlansModule {}
