import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { CreateDailyReportDto } from './dto/create-daily_report.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom, SuccessCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from 'src/common/error.handle';
import { StorageService } from '../storage/storage.service';

const CHECK_IN_STATUS = "Check In";
const CHECK_OUT_STATUS = "Check Out";


@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService,
    private storageService: StorageService
  ) { }

  async create(createStaffDto: CreateStaffDto) {
    const { staff_name, gender, address, phone_number, email, position } = createStaffDto;
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
        salary: salaryNumber,
        start_date,
        deleted: false
      }
    });
    return newStaff;
  }


  displayError() {
    throw new ErrorCustom(ERROR_RESPONSE.StaffIsNotExisted);
  }

  findAll() {
    return this.prisma.staff.findMany({
      where: {
        deleted: false
      }
    });
  }

  // async findOne(id: number) {
  //   const staff = await this.prisma.staff.findUnique({
  //     where: {
  //       staff_id: id,
  //       deleted: false
  //     }
  //   });
  //   if (!staff) {
  //     this.displayError();
  //   }
  //   return staff;
  // }

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
    if (!findStaff) {
      this.displayError();
    }
    const update = await this.prisma.staff.update({
      where: { staff_id: id, deleted: false },
      data: {
        ...updateStaffDto,
        ...(updateStaffDto.birthday && { birthday: new Date(updateStaffDto.birthday as any) }),
        ...(updateStaffDto.salary && { salary: parseFloat(updateStaffDto.salary as any) }),
        ...(updateStaffDto.start_date && { start_date: new Date(updateStaffDto.start_date as any) })
      }
    });
    return update;
  }

  async softDeleted(id: number) {
    const findStaff = this.findObject(id);
    if (!findStaff) {
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

  async checkIn(staff_id: number) {
    // try {

      const checkUserLogin = await this.checkUserIsLoginAndLogOut(staff_id, CHECK_IN_STATUS)
      if(checkUserLogin){
          return false
      }
      else{
        const timeStartWork = 9;
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
  
        // Calculate late arrival time
        let timeLateHours = Math.max(0, currentHour - timeStartWork);
        let timeLateMinutes = currentMinutes;
  
        const checkIn = await this.prisma.attendance.create({
          data: {
            date: now,
            staff_id: +staff_id,
            check_in_time: now,
            status: CHECK_IN_STATUS,
            notes: currentHour > timeStartWork || (currentHour === timeStartWork && currentMinutes > 0)? `Arrived ${timeLateHours} hour(s) and ${timeLateMinutes} minute(s) late` : "On time"
          }
        });
        return true
      }
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async listAttendance(){
     try {
        return await this.prisma.attendance.findMany()
     } catch (error) {
        throw new Error(error)
     }
  }

  async listDailyReport(){
    try {
       return await this.prisma.dailyReport.findMany()
    } catch (error) {
       throw new Error(error)
    }
 }

  async checkOut(staff_id: number) {
    // try {

      const checkUserLogout = await this.checkUserIsLoginAndLogOut(staff_id, CHECK_OUT_STATUS)
      if(checkUserLogout){
          return false
      }
      else {
        const timeStartWork = 17;
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
  
        // Calculate late arrival time
        let timeLateHours = Math.max(0, timeStartWork - currentHour);
        let timeLateMinutes = currentMinutes;
        if (currentHour > timeStartWork || (currentHour === timeStartWork && currentMinutes > 0)) {
          timeLateHours = 0;
          timeLateMinutes = 0;
        }
        const checkOut = await this.prisma.attendance.create({
          data: {
            date: now,
            staff_id: +staff_id,
            check_out_time: now,
            status: CHECK_OUT_STATUS,
            notes: timeLateHours > 0 || timeLateMinutes > 0 ? `Left ${timeLateHours - 1} hour(s) and ${60 - timeLateMinutes} minute(s) early` : "Left On time"
          }
        });
        return true;
      }
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async checkUserIsLoginAndLogOut(staff_id, status) {
    try {
      const now = new Date();
      const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); // Lấy ngày trước đó

      if(status == CHECK_IN_STATUS){
        const findUserCheckIn = await this.prisma.attendance.findFirst({
          where: {
            staff_id: +staff_id,
            date: {
              gte: yesterday,
              lt: now
            },
            status: CHECK_IN_STATUS
          }
        });
  
        if (!findUserCheckIn) {
          return false
        }
        return true
      }
      else if( status == CHECK_OUT_STATUS){
        const findUserCheckOut = await this.prisma.attendance.findFirst({
          where: {
            staff_id: +staff_id,
            date: {
              gte: yesterday,
              lt: now
            },
            status: CHECK_OUT_STATUS
          }
        });
  
        if (!findUserCheckOut) {
          return false
        }
        return true
      }

      
    } catch (error) {
      throw new Error(error)
    }

  }


  async checkUserCreatedDailyReport(user_id: number){
      try {
        const now = new Date();
      const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); // Lấy ngày trước đó

      const checkUserCreatedDailyReport = await this.prisma.dailyReport.findFirst({
        where: {
          user_id: +user_id,
          created_at: {
            gte: yesterday,
            lt: now
          },
        }
      });
      if (!checkUserCreatedDailyReport) {
        return false
      }
      return true
      } catch (error) {
        throw new Error(error)
      }
  }


  async createDailyReport(user_id: number, createDailyReportDto: CreateDailyReportDto) {
    try {
      const now = new Date();
      const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
      const listBill = await this.prisma.bill.findMany({
        where: {
          bill_date: {
            gte: yesterday || undefined,
            lte: now || undefined
          },
        },
        // include: {
        //   billdetails: {
        //     include: {
        //       drink: true
        //     }
        //   }
        // }
      });
      let price = 0
       listBill.map((items)=>{
          price += items.total_price
      })

      const createDailyReport = await this.prisma.dailyReport.create({
        data:{
            date: new Date(),
            content: createDailyReportDto.content,
            created_at: new Date(),
            user_id: +user_id
        }
      })
    return new SuccessCustom(SUCCESS_RESPONSE.ResponseSuccess,{price, createDailyReport})
      // return {
      //   status: 200,
      //   data:{
      //     price,
      //     createDailyReport
      //   }
      // }
    } catch (error) {
      throw new Error(error)
    }
  }



}