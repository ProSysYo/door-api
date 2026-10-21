import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { KnobsModule } from './knobs/knobs.module';
import { PaintsModule } from './paints/paints.module';

@Module({
  imports: [DbModule, UsersModule, AuthModule, KnobsModule, PaintsModule],
})
export class AppModule {}
