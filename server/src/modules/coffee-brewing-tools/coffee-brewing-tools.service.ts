import { Injectable } from '@nestjs/common';
import { CreateCoffeeBrewingToolDto } from './dto/create-coffee-brewing-tool.dto';
import { UpdateCoffeeBrewingToolDto } from './dto/update-coffee-brewing-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class CoffeeBrewingToolsService {
  constructor(private prisma: PrismaService) { }

  // async create(createCoffeeBrewingToolDto: CreateCoffeeBrewingToolDto) {
  // const {brewingtool_name} = createCoffeeBrewingToolDto;
  // const newTool = await this.prisma.coffeeBrewingTool.create({
  //   data: {
  //     brewingtool_name,
  //     storage_id: 14
  //   },
  // });
  //   return newTool;
  // }

  displayError(){
    throw new ErrorCustom(ERROR_RESPONSE.ToolIsNotExisted);
  }

  findAll() {
    return this.prisma.coffeeBrewingTool.findMany();
  }

  async findOne(id: number) {
    const tool = await this.prisma.coffeeBrewingTool.findUnique({ where: { brewingTool_id: id } });
    if (!tool) {
      this.displayError();
    }
    return tool;
  }

  async findItem(id: number) {
    const find = await this.prisma.coffeeBrewingTool.findUnique({
      where: {
        brewingTool_id: id
      }
    });
    if (!find) {
      throw new ErrorCustom(ERROR_RESPONSE.ToolIsNotExisted);
    } else {
      return true;
    }
  }

  async update(id: number, updateCoffeeBrewingToolDto: UpdateCoffeeBrewingToolDto) {
    const findTool = await this.findItem(id);
    if (!findTool) {
      this.displayError();
    }
    const tool = await this.prisma.coffeeBrewingTool.update({ where: { brewingTool_id: id }, data: updateCoffeeBrewingToolDto });
    return tool;
  }

  async remove(id: number) {
    const findTool = await this.findItem(id);
    if(!findTool){
      this.displayError();
    }
    const remove = this.prisma.coffeeBrewingTool.delete({ where: { brewingTool_id: id } });
    return remove;
  }

}
