import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-guard';
import { ApiTags } from '@nestjs/swagger';
import { FormDataInterceptor } from 'src/third-parties/interceptors/transform.interceptor';
import { Roles } from 'src/third-parties/interceptor/role.interceptor';

@ApiTags('bill')
@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FormDataInterceptor)
  create(@Body() createBillDto: CreateBillDto,@Req() request) {
    return this.billService.create(createBillDto,request.user.user_id);
  }

  @Post('statictical')
  @UseInterceptors(FormDataInterceptor)
  statictical(@Body('toDateInput') toDateInput : string , @Body('fromDateInput') fromDateInput: string) {
    //console.log(toDateInput,fromDateInput);

    return this.billService.statistical(fromDateInput,toDateInput );
  }

  @Get()

  findAll() {
    return this.billService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(+id);
  }

  @Post('findDrinkByName')
  findDrinkByName() {
    return this.billService.findDrinkByName('Coffee')
  }

  @Patch(':id')
  @UseInterceptors(FormDataInterceptor)
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(+id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
