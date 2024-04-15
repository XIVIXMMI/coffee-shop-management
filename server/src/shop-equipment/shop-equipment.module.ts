import { Module } from '@nestjs/common';
import { ShopEquipmentService } from './shop-equipment.service';
import { ShopEquipmentController } from './shop-equipment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ShopEquipmentController],
  providers: [ShopEquipmentService],
  imports: [PrismaModule]
})
export class ShopEquipmentModule {}
