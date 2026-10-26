import { Module } from '@nestjs/common';
import { PackagingsService } from './packagings.service';
import { PackagingsController } from './packagings.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PackagingsController],
  providers: [PackagingsService],
})
export class PackagingsModule {}
