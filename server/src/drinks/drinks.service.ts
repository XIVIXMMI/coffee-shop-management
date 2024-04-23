import { Injectable } from '@nestjs/common';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DrinksService {
  constructor(private prisma: PrismaService) { }

  async create(createDrinkDto: CreateDrinkDto) {
    const { drink_name, price } = createDrinkDto;
    const newDrinks = await this.prisma.drink.create({
      data: {
        drink_name,
        price
      }
    })
    for (let drinkDetails of createDrinkDto.drink_details) {
      const ingredientWeightInKg = drinkDetails.ingredient_weight / 1000;
      await this.prisma.drinksDetails.create({
        data: {
          drink_id: newDrinks.drink_id,
          ingredient_id: drinkDetails.ingredient_id,
          ingredient_weight: ingredientWeightInKg
        }
      })
    }
    return newDrinks;
  }

  findAll() {
    return this.prisma.drink.findMany();
  }

  findOne(id: number) {
    const drinks = this.prisma.drink.findUnique({
      where: { drink_id: id }
    });
    return drinks;
  }

  async update(id: number, updateDrinkDto: UpdateDrinkDto) {
    const updateDrink = await this.prisma.drink.update({
      where: {
        drink_id: id
      },
      data: {
        drink_name: updateDrinkDto.drink_name,
        price: updateDrinkDto.price
      }
        
    });
    for (let drinkDetails of updateDrinkDto.drink_details) {
      const ingredientWeightInKg = drinkDetails.ingredient_weight / 1000;
      await this.prisma.drinksDetails.update({
        where: { drink_id_ingredient_id: { drink_id: id, ingredient_id: drinkDetails.ingredient_id } },
        data: {
          ingredient_weight: ingredientWeightInKg,
        },
      });
    }
    return updateDrink;
  }

  remove(id: number) {
    return this.prisma.drink.delete({ where: { drink_id: id } });
  }
}
