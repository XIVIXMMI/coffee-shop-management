import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-guard';

@ApiTags('drinks')
@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService,) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_url'))
  @ApiBody({ type: CreateDrinkDto})
  @ApiResponse({ status: 200, type: CreateDrinkDto })
  async create(@UploadedFile() image: Express.Multer.File,@Body() createDrinkDto: CreateDrinkDto) {
    console.log(createDrinkDto);
    //return this.drinksService.create(createDrinkDto,image);
  }

  @Get()
  findAll() {
    return this.drinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto) {
    return this.drinksService.update(+id, updateDrinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drinksService.remove(+id);
  }
}
