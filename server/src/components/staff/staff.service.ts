import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(createStaffDto: CreateStaffDto) {
    const { staff_name, gender, address, phone_number, email, position, salary} = createStaffDto;
    const birthday = new Date(createStaffDto.birthday);
    const start_date = new Date(createStaffDto.start_date);

    if(!(birthday instanceof Date) || isNaN(birthday.getTime())){
      throw new BadRequestException('birthday must be a valid Date')
    }
    if(!(start_date instanceof Date) || isNaN(start_date.getTime())){
      throw new BadRequestException('start_date must be a valid Date')
    }

    const newStaff = await this.prisma.staff.create({
      data: {
        staff_name,
        gender,
        birthday,
        address, 
        phone_number,
        email,
        position,
        salary,
        start_date
      }
    });
    return newStaff;
  }

  findAll() {
    return this.prisma.staff.findMany();
  }

  async findOne(id: number) {
    const staff = await this.prisma.staff.findUnique({
      where: {
        staff_id: id
      }
    })
    return staff;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: {staff_id: id},
      data: updateStaffDto
    });
  }

  remove(id: number) {
    return this.prisma.staff.delete({where: {staff_id: id}});
  }
}
