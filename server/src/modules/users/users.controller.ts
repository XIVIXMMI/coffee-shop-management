import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/third-parties/guard/jwt-guard';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles } from 'src/third-parties/interceptor/role.interceptor';
import { RolesGuard } from 'src/third-parties/guard/role.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
  ) { }

  @Post()
  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }


  @Get('/user_not_have_account')

  findAllStaffNotHaveAccount() {
    return this.usersService.findUserHaveAccount();
    
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  // @Roles(Role.Admin)
  // @UseGuards(RolesGuard)
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
