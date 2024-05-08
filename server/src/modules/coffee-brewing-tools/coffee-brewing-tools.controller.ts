import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeBrewingToolsService } from './coffee-brewing-tools.service';
import { CreateCoffeeBrewingToolDto } from './dto/create-coffee-brewing-tool.dto';
import { UpdateCoffeeBrewingToolDto } from './dto/update-coffee-brewing-tool.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('coffee-brewing-tools')
@Controller('coffee-brewing-tools')
export class CoffeeBrewingToolsController {
  constructor(private readonly coffeeBrewingToolsService: CoffeeBrewingToolsService) {}

  // @Post()
  // create(@Body() createCoffeeBrewingToolDto: CreateCoffeeBrewingToolDto) {
  //   return this.coffeeBrewingToolsService.create(createCoffeeBrewingToolDto);
  // }

  @Get()
  findAll() {
    return this.coffeeBrewingToolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeBrewingToolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeBrewingToolDto: UpdateCoffeeBrewingToolDto) {
    return this.coffeeBrewingToolsService.update(+id, updateCoffeeBrewingToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeBrewingToolsService.remove(+id);
  }
}
