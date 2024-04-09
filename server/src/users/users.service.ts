import { Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Console, log } from 'console';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { username, password, phone_number } = createUserDto;
    const newUser = await this.prisma.user.create({
      data: {
        username,
        password,
        phone_number,
        staff_id:  1, 
        role_id: 1
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where : {user_id: id},
      data: updateUserDto
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {user_id: id}});
  }
}
