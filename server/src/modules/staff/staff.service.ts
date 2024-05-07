import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async create(createStaffDto: CreateStaffDto) {
    const { staff_name, gender, address, phone_number, email, position, salary} = createStaffDto;
    const birthday = new Date(createStaffDto.birthday);
    const start_date = new Date(createStaffDto.start_date);
    
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
        start_date,
        deleted: false
      }
    });
    return newStaff;
  }

  findAll() {
    return this.prisma.staff.findMany({
      where: {
        deleted: false
      }
    });
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

  async remove(id: number) {
    const remove = await this.prisma.staff.update({
      where: {
        staff_id: id
      },
      data: {
        deleted: true
      }
    });
    if(!remove){
      throw new ErrorCustom(ERROR_RESPONSE.UserIsExisted);
    }
    return remove;
  }
}

