import { HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { username, password, phone_number, staff_id, role_id } = createUserDto;
    const checkPhone = await this.prisma.user.findFirst({
      where: {
        phone_number: '+84' + phone_number.replace(/^0+/, ''),
      }
    })
    if (checkPhone) {
      throw new ErrorCustom(ERROR_RESPONSE.UserIsExisted)
    }
    else{
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
    } catch (error) {
      throw new Error(error)
    }   
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findUserHaveAccount() {
    try {
      const UserhaveAccount = await this.prisma.staff.findMany(
        {
          select:
          {
            staff_id: true
          }
        }
      )
      if (!UserhaveAccount) {
        throw new ErrorCustom(ERROR_RESPONSE.UserNotExits)
      }
      const listUser = await this.prisma.user.findMany({
        select: {
          staff_id: true
        }
      })
      if (!listUser) {
        throw new ErrorCustom(ERROR_RESPONSE.StaffIsNotExisted)
      }

      const checkStaff_id = listUser.map(users => users.staff_id)

      const missingStaff = UserhaveAccount.filter(items => !checkStaff_id.includes(items.staff_id))

      return missingStaff
    } catch (error) {
      throw new Error(error)
    }

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.phone_number && !updateUserDto.phone_number.startsWith('+84')) {
        const converPhone =  updateUserDto.phone_number = '+84' + updateUserDto.phone_number.replace(/^0+/, '');
        const checkPhone = await this.prisma.user.findFirst({
          where: {
            phone_number: converPhone
          }
        })
        if (checkPhone) {
          throw new ErrorCustom(ERROR_RESPONSE.UserIsExisted)
        }
      }
  
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (updateUserDto.password && !passwordRegex.test(updateUserDto.password)) {
          throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.');
      }
  
      return this.prisma.user.update({
        where: { user_id: id },
        data: {
          ...updateUserDto,
        }
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  async remove(id: number) {
    const checkDelete = await this.prisma.user.findFirst({
      where:{
        user_id: id
      }
    })
    if(!checkDelete){
      throw new ErrorCustom(ERROR_RESPONSE.UserNotExits)
    }
    return this.prisma.user.delete({ where: { user_id: id } });
  }

  async checkStaffId(staff_id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        staff_id
      }
    })
    if (user) {
      throw new ErrorCustom(ERROR_RESPONSE.UserIsExisted);
    }
  }


  async checkStaffExisted(staff_id: number) {
    const user = await this.prisma.staff.findUnique({
      where: {
        staff_id
      }
    })
    if (!user) {
      throw new ErrorCustom(ERROR_RESPONSE.UserNotExits);
    }
  }
}
