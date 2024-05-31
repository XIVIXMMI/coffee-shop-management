import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  controllers: [StaffController],
  providers: [StaffService],
  imports: [PrismaModule, StorageModule]
})
export class StaffModule {}
