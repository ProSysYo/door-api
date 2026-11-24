import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KnobsModule } from './knobs/knobs.module';
import { PaintsModule } from './paints/paints.module';
import { PackagingsModule } from './packagings/packagings.module';
import { FoilsModule } from './foils/foils.module';
import { EarsModule } from './ears/ears.module';
import { BoltsModule } from './bolts/bolts.module';
import { HingesModule } from './hinges/hinges.module';
import { InsideFinishesModule } from './inside-finishes/inside-finishes.module';
import { JambHolesModule } from './jamb-holes/jamb-holes.module';
import { LocksModule } from './locks/locks.module';
import { ModelsModule } from './models/models.module';
import { OutsideFinishesModule } from './outside-finishes/outside-finishes.module';
import { PadsModule } from './pads/pads.module';
import { PeepholesModule } from './peepholes/peepholes.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ShipmentPlansModule } from './shipments/shipment-plans.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    AuthModule,
    KnobsModule,
    PaintsModule,
    PackagingsModule,
    FoilsModule,
    EarsModule,
    BoltsModule,
    HingesModule,
    InsideFinishesModule,
    JambHolesModule,
    LocksModule,
    ModelsModule,
    OutsideFinishesModule,
    PadsModule,
    PeepholesModule,
    CustomersModule,
    OrdersModule,
    ShipmentPlansModule,
  ],
})
export class AppModule {}
