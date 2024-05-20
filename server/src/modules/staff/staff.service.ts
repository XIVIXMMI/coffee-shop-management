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
    const { staff_name, gender, address, phone_number, email, position} = createStaffDto;
    const birthday = new Date(createStaffDto.birthday);
    const start_date = new Date(createStaffDto.start_date);

    const salaryNumber = +createStaffDto.salary;

    const newStaff = await this.prisma.staff.create({
      data: {
        staff_name,
        gender,
        birthday,
        address, 
        phone_number,
        email,
        position,
        salary:salaryNumber,
        start_date,
        deleted: false
      }
    });
    return newStaff;
  }

    
  displayError(){
    throw new ErrorCustom(ERROR_RESPONSE.StaffIsNotExisted);
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
        staff_id: id,
        deleted: false
      }
    });
    if(!staff){
      this.displayError();
    }
    return staff;
  }

  async findObject(id: number) {
    const find = await this.prisma.staff.findUnique({
      where: {
        staff_id: id,
        deleted: false
      }
    });
    if (!find) {
      return false;
    } else {
      return true;
    }
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const findStaff = await this.findObject(id);
    if(!findStaff){
      this.displayError();
    }
    const update = await this.prisma.staff.update({
      where: {staff_id: id, deleted: false},
      data: {
        ...updateStaffDto,
        ...(updateStaffDto.birthday && {birthday: new Date(updateStaffDto.birthday as any)}),
        ...(updateStaffDto.salary && {salary: parseFloat(updateStaffDto.salary as any)}),
        ...(updateStaffDto.start_date && {start_date: new Date (updateStaffDto.start_date as any)})
      }
    });
    return update;
  }

  async softDeleted(id: number) {
    const findStaff = this.findObject(id);
    if(!findStaff){
      this.displayError();
    }
    const remove = await this.prisma.staff.update({
      where: {
        staff_id: id
      },
      data: {
        deleted: true
      }
    });
    return remove;
  }
}