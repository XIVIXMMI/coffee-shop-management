import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DrinksController],
  providers: [DrinksService],
  imports: [PrismaModule]
})
export class DrinksModule {}
