import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DrinksModule } from 'src/modules/drinks/drinks.module';

@Module({
  controllers: [BillController],
  providers: [BillService],
  imports: [PrismaModule, DrinksModule]
})
export class BillModule {}
