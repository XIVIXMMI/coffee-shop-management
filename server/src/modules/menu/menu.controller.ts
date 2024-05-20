import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import {  UpdateMenuDto,UpdateMenuDetailDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';
import { FormDataInterceptor } from 'src/third-parties/interceptors/transform.interceptor';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @UseInterceptors(FormDataInterceptor)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get('/menu_details')
  findOneee() {
    return this.menuService.displayMenuDetails();
  }

  @Patch(':id')
  @UseInterceptors(FormDataInterceptor)
  update(@Param('id') id: string,updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Patch('menu_details/:menu_id')
  @UseInterceptors(FormDataInterceptor)
  updateMenuDetails(@Param('menu_id') menu_id: number ,@Body() updateMenuDetailDto: UpdateMenuDetailDto) {
    return this.menuService.updateMenuDetails( menu_id, updateMenuDetailDto );

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }

  @Delete('menu_details/:menu_id')
  removeMenuDetails(@Param('menu_id') id: number){
    return this.menuService.removeMenuDetails(+id);
  }
}
