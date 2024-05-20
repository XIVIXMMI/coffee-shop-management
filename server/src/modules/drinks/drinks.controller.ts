import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { DrinksService } from './drinks.service';
import { CreateDrinkDetailsDto, CreateDrinkDto } from './dto/create-drink.dto';
import { DrinkDetailsDto, UpdateDrinkDetailDto, UpdateDrinkDto } from './dto/update-drink.dto';
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
    //console.log(createDrinkDto);
    return this.drinksService.create(createDrinkDto,image);
  }

  @Get('/drink-details')
  findAllDrinkDetails() {
    return this.drinksService.findAllDrinkDetails();
  }

  @Get()
  findAll() {
    return this.drinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinksService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_url'))
  @ApiBody({ type: UpdateDrinkDto})
  @ApiResponse({ status: 200, type: UpdateDrinkDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrinkDto: UpdateDrinkDto, @UploadedFile() image: Express.Multer.File) {
    return this.drinksService.update(+id, updateDrinkDto,image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drinksService.remove(+id);
  }

  @Post('/drink-details')
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateDrinkDetailsDto})
  @ApiResponse({ status: 200, type: CreateDrinkDetailsDto })
  async createDrinkDetail(@Body() createDrinkDetailsDto: CreateDrinkDetailsDto) {
    console.log(createDrinkDetailsDto);
    return this.drinksService.createDrinkDetail(createDrinkDetailsDto);
  }

  @Patch('/drink-details/:drink_id')
  @ApiBody({ type: DrinkDetailsDto})
  @ApiResponse({ status: 200, type: DrinkDetailsDto })
  async updateDrinkDetailDto(@Param('drink_id') drink_id: number,
                              @Body() updateDrinkDetailDto: UpdateDrinkDetailDto) {

    return this.drinksService.updateDrinkDetailDto(drink_id,updateDrinkDetailDto);
  }

  @Delete('/drink-details/:drink_id')
  removeDrinkDetails(@Param('drink_id') drink_id: number){
    return this.drinksService.removeDrinkDetails(+drink_id);
  }

}
