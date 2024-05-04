import { Module } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { DrinksController } from './drinks.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';

@Module({
  controllers: [DrinksController],
  providers: [DrinksService,CloudinaryService],
  imports: [PrismaModule],
  exports: [DrinksService]
})
export class DrinksModule {}
