import { Injectable } from '@nestjs/common';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DrinksService {
  constructor (private prisma: PrismaService) {}

  async create(createDrinkDto: CreateDrinkDto) {
    const {drink_name, price} = createDrinkDto;
    const newDrinks = await this.prisma.drink.create({
      data: {
        drink_name,
        price
      }
    })
    return newDrinks;
  }

  findAll() {
    return this.prisma.drink.findMany();
  }

  findOne(id: number) {
    const drinks = this.prisma.drink.findUnique({
      where: {drink_id: id}
    });
    return drinks;
  }

  update(id: number, updateDrinkDto: UpdateDrinkDto) {
    return this.prisma.drink.update({ where: {drink_id: id }, data: updateDrinkDto});
  }

  remove(id: number) {
    return this.prisma.drink.delete({where: {drink_id: id}});
  }
}
