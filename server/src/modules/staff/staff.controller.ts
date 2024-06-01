import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiTags } from '@nestjs/swagger';
import { FormDataInterceptor } from 'src/third-parties/interceptors/transform.interceptor';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-guard';
import { CreateDailyReportDto } from './dto/create-daily_report.dto';

@ApiTags('staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FormDataInterceptor)
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get("check_daily_report")
  @UseGuards(JwtAuthGuard)
  checkUserCreatedDailyReport(@Req() request){
      return this.staffService.checkUserCreatedDailyReport(request.user.user_id)
  }

  @Get("list_attedacce")
  listAttandace(){
      return this.staffService.listAttendance()
  }

  @Get("list_report")
  listDailyReport(){
      return this.staffService.listDailyReport()
  }

  // @Get("check")
  // @UseGuards(JwtAuthGuard)
  // checkUserCheckIn(@Req() request){
  //     return this.staffService.checkUserIsLogin(request.user.staff_id)
  // }


  
  

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.staffService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.staffService.findOne(+id);
  // }

  @Patch(':id')
  @UseInterceptors(FormDataInterceptor)
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Patch('/remove/:id')
  remove(@Param('id') id: string) {
    return this.staffService.softDeleted(+id);
  }

  @Post("check_in")
  @UseGuards(JwtAuthGuard)
  checkin(@Req() request){
      return this.staffService.checkIn(request.user.staff_id)
  }

  @Post("check_out")
  @UseGuards(JwtAuthGuard)
  checkout(@Req() request){
      return this.staffService.checkOut(request.user.staff_id)
  }

  @Post("daily_report")
  @UseGuards(JwtAuthGuard)
  dailyreport(@Req() request,@Body() createDailyReportDto: CreateDailyReportDto){
      return this.staffService.createDailyReport(request.user.user_id,createDailyReportDto )
  }

}
