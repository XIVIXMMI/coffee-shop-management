import { HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, password, phone_number, staff_id, role_id  } = createUserDto;
    await this.checkStaffId(staff_id);
    await this.checkStaffExisted(staff_id);
    const newUser = await this.prisma.user.create({
      data: {
        username,
        password,
        phone_number: '+84' + phone_number.replace(/^0+/, ''),
        staff_id,
        role_id
      },
    });
    return newUser;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: id
      }
    });
    return user;
  }

  async findByPhoneNumber(phone_number: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        phone_number
      }
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where : {user_id: id},
      data: {
        ...updateUserDto, 
        phone_number: '+84' + updateUserDto.phone_number.replace(/^0+/, '')
      }
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {user_id: id}});
  }

  async checkStaffId (staff_id: number) {
    const user = await this.prisma.user.findFirst({
      where: { 
        staff_id
      }
    })
    if(user){
      throw new ErrorCustom(ERROR_RESPONSE.UserIsExisted);
    }
  }


  async checkStaffExisted (staff_id: number) {
    const user = await this.prisma.staff.findUnique({
      where: { 
        staff_id
      }
    })
    if(!user){
      throw new ErrorCustom(ERROR_RESPONSE.UserNotExits);
    }
  }
}
