import { Module } from '@nestjs/common';
import { CoffeeBrewingToolsService } from './coffee-brewing-tools.service';
import { CoffeeBrewingToolsController } from './coffee-brewing-tools.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CoffeeBrewingToolsController],
  providers: [CoffeeBrewingToolsService],
  imports: [PrismaModule]
})
export class CoffeeBrewingToolsModule {}
