import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
  imports: [PrismaModule],
  exports:[StorageService]
})
export class StorageModule {}
