import { Injectable } from '@nestjs/common';
import { CreateCoffeeBrewingToolDto } from './dto/create-coffee-brewing-tool.dto';
import { UpdateCoffeeBrewingToolDto } from './dto/update-coffee-brewing-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoffeeBrewingToolsService {
  constructor(private prisma: PrismaService){}

  async create(createCoffeeBrewingToolDto: CreateCoffeeBrewingToolDto) {
  const {brewingtool_name} = createCoffeeBrewingToolDto;
  const newTool = await this.prisma.coffeeBrewingTool.create({
    data: {
      brewingtool_name,
      storage_id: 14
    },
  });
    return newTool;
  }

  findAll() {
    return this.prisma.coffeeBrewingTool.findMany();
  }

  async findOne(id: number) {
    const tool = this.prisma.coffeeBrewingTool.findUnique({where: {brewingTool_id: id}});
    return tool;
  }

  update(id: number, updateCoffeeBrewingToolDto: UpdateCoffeeBrewingToolDto) {
    return this.prisma.coffeeBrewingTool.update({where: {brewingTool_id: id}, data: updateCoffeeBrewingToolDto});
  }

  remove(id: number) {
    return this.prisma.coffeeBrewingTool.delete({where: {brewingTool_id: id}});
  }
}
