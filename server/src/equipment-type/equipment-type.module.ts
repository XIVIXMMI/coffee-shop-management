import { Module } from '@nestjs/common';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentTypeController } from './equipment-type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EquipmentTypeController],
  providers: [EquipmentTypeService],
  imports: [PrismaModule]
})
export class EquipmentTypeModule {}
