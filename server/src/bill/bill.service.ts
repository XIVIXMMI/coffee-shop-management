import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class BillService {
  constructor(private prisma: PrismaService) { }

  // TODO: Xử lý ngoại lệ khi nhập 2 item, 1 item đã có trong db và 1 item chưa có trong db
  async create(createBillDto: CreateBillDto, createdBy: number) {
    const billDate = new Date();
    let totalPrice = 0;
    const newBill = await this.prisma.bill.create({
      data: {
        bill_date: billDate,
        total_price: totalPrice,
        created_by: createdBy,
        staff_id: createdBy,
      }
    })

    for (let detail of createBillDto.bill_details) {
      const getIdByName = await this.findDrinkByName(detail.drink_name)
      const getIdDrink = getIdByName.drink_id;
      const getDrinkPrice = getIdByName.price
      let numberValue: number = Number(getDrinkPrice);
      totalPrice += detail.quantity * numberValue;

      //console.log(detail.drink_name)
      if (!getIdByName) {
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted, `${10}`);
      }

        await this.prisma.billDetails.create({
          data: {
            drink_id: getIdDrink,
            bill_id: detail.bill_id,
            quantity: detail.quantity,
            price: getDrinkPrice
          }
        });
      //console.log(detail.bill_id)
    }
    await this.prisma.bill.update({
      where: {
        bill_id: newBill.bill_id,
      },
      data: {
        total_price: totalPrice,
      },
    });
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
    return this.prisma.bill.delete({ where: { bill_id: id } });
  }

  async findDrinkByName(drink_name: string) {
    const drinkName = await this.prisma.drink.findFirst({
      where: {
        drink_name
      },
      select: {
        drink_id: true,
        price: true
      }
    })
    // if(!drinkName){
    //   throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
    // }
    return drinkName;
  }

  async checkIfDrinkExisted(drink_id: number) {
    const drinkId = await this.prisma.drink.findUnique({
      where: {
        drink_id
      }
    })

  }
}
