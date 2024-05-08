import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  // async create(createIngredientDto: CreateIngredientDto) {
  //   const { ingredient_name} = createIngredientDto;
  //   const newIngredient = await this.prisma.ingredient.create({
  //     data: {
  //       ingredient_name,
  //       storage_id: 2
  //       //TODO: need to be dynamic
  //     }
  //   })
  //   return newIngredient;
  // }


  displayError(){
    throw new ErrorCustom(ERROR_RESPONSE.IngredientIsNotExisted);
  }

  findAll() {
    return this.prisma.ingredient.findMany();
  }

  async findOne(id: number) {
    const ingredient = await this.prisma.ingredient.findUnique({
      where: { 
        ingredient_id: id
      }
    });
    if(!ingredient){
      this.displayError();
    }
    return ingredient;
  }

  async findObject(id: number) {
    const find = await this.prisma.ingredient.findUnique({
      where: {
        ingredient_id: id,
      }
    });
    if (!find) {
      return false;
    } else {
      return true;
    }
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const findIngredient = await this.findObject(id);
    if(!findIngredient){
      this.displayError();
    }
    const ingredient = await this.prisma.ingredient.update({
      where: {ingredient_id: id},
      data: updateIngredientDto
    });
    return ingredient;
  }

  async remove(id: number) {
    const findItem = await this.findObject(id);
    if(!findItem){
      this.displayError();
    }
    const remove = this.prisma.ingredient.delete({where: {ingredient_id: id}});
    return remove;
  }
}
