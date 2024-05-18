import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import {  UpdateMenuDto,UpdateMenuDetailDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.displayMenuItem(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Patch('menu_details/:menu_id')
  updateMenuDetails(@Param('menu_id') menu_id: number ,@Body() updateMenuDetailDto: UpdateMenuDetailDto) {
    return this.menuService.updateMenuDetails( menu_id, updateMenuDetailDto );

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
