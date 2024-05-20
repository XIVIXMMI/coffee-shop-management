import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FormDataInterceptor } from 'src/third-parties/interceptors/transform.interceptor';

@ApiBearerAuth()
@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FormDataInterceptor)
  create(@Body() createStorageDto: CreateStorageDto, @Req() request) {
    return this.storageService.create(createStorageDto,request.user.user_id);
  }

  @Get()
  findAll() {
    return this.storageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FormDataInterceptor)
  update(@Param('id') id: string, @Body() updateStorageDto: UpdateStorageDto) {
    return this.storageService.update(+id, updateStorageDto);
  }

  @Patch('softDelete/:id')
  @UseInterceptors(FormDataInterceptor)
  softDelete(@Param('id') id: string) {
    return this.storageService.softDelete(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageService.remove(+id);
  }

  @Post('statistical')
  @ApiConsumes('application/json')
  @ApiBody({ type: () => CreateStorageDto, isArray: true })
  @ApiResponse({
    status: 200,
    description: 'Statistical data of storage',
    schema: {
      example: {
        totalQuantityAll: 100,
        totalCostPriceAll: 50000,
        goodsCounts: {
          "Coffee Beans": {
            quantity: 50,
            totalCostPrice: 25000
          },
          "Milk": {
            quantity: 50,
            totalCostPrice: 25000
          }
        }
      }
    }
  })
  async statistical(@Body('toDateInput') toDateInput: string, @Body('fromDateInput') fromDateInput: string) {
    return this.storageService.statistical(fromDateInput, toDateInput);
  }

}
