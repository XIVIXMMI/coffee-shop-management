import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopEquipmentService } from './shop-equipment.service';
import { CreateShopEquipmentDto } from './dto/create-shop-equipment.dto';
import { UpdateShopEquipmentDto } from './dto/update-shop-equipment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shop-equipment')
@Controller('shop-equipment')
export class ShopEquipmentController {
  constructor(private readonly shopEquipmentService: ShopEquipmentService) {}

  // @Post()
  // create(@Body() createShopEquipmentDto: CreateShopEquipmentDto) {
  //   return this.shopEquipmentService.create(createShopEquipmentDto);
  // }

  @Get()
  findAll() {
    return this.shopEquipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopEquipmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopEquipmentDto: UpdateShopEquipmentDto) {
    return this.shopEquipmentService.update(+id, updateShopEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopEquipmentService.remove(+id);
  }
}
