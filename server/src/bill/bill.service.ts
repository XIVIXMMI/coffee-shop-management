import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class BillService {
  constructor (private prisma: PrismaService) {}

  async create(createBillDto: CreateBillDto) {
    const billDate = new Date();
    let totalPrice = 0;
    for (let detail of createBillDto.bill_details) {
      totalPrice += detail.quantity * detail.price;
      
      const getIdByName = await this.findDrinkByName(detail.drink_name);
      console.log(detail.drink_name)
      if(getIdByName != null){
        const getIdDrink = getIdByName.drink_id;
        
      // await this.prisma.billDetails.create({
      //   data: {
      //     drink_id: getIdDrink,
      //     bill_id: detail.bill_id,
      //     quantity: detail.quantity,
      //     price: detail.price
      //   }
      // });
      }else{
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted, `${10}`);
      }
    }
    const newBill = await this.prisma.bill.create({
      data: {
        bill_date: billDate,
        total_price: totalPrice,
        staff_id: 1
      }
    })
    return newBill;
  }

  findAll() {
    return this.prisma.bill.findMany();
  }

  async findOne(id: number) {
    const bill = await this.prisma.bill.findUnique({
      where: {
        bill_id: id
      }
    })
    return bill;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return this.prisma.bill.update({
      where: {
        bill_id: id
      },
      data: updateBillDto
    });
  }

  remove(id: number) {
    return this.prisma.bill.delete({ where: {bill_id: id}});
  }

  async findDrinkByName(drink_name: string){
    const drinkName = await this.prisma.drink.findFirst({
      where: {
        drink_name
      },
      select: {
        drink_id: true
      }
    })
    // if(!drinkName){
    //   throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
    // }
    return drinkName;
  }

  async checkIfDrinkExisted(drink_id: number){
    const drinkId = await this.prisma.drink.findUnique({
      where: {
        drink_id
      }
    })
    
  }
}
