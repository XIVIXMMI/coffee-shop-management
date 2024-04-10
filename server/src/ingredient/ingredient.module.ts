import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [IngredientController],
  providers: [IngredientService],
  imports: [PrismaModule]
})
export class IngredientModule {}
