import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const { ingredient_name} = createIngredientDto;
    const newIngredient = await this.prisma.ingredient.create({
      data: {
        ingredient_name,
        storage_id: 2
      }
    })
    return newIngredient;
  }

  findAll() {
    return this.prisma.ingredient.findMany();
  }

  findOne(id: number) {
    return this.prisma.ingredient.findUnique({
      where: { ingredient_id: id}
    });
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.prisma.ingredient.update({
      where: {ingredient_id: id},
      data: updateIngredientDto
    });
  }

  remove(id: number) {
    return this.prisma.ingredient.delete({where: {ingredient_id: id}});
  }
}
