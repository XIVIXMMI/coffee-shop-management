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
      }
    })

    for (let detail of createBillDto.bill_details) {
      const getIdByName = await this.findDrinkByName(detail.drink_name);
      if (!getIdByName) {
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
      }

      const getIdDrink = getIdByName.drink_id;
      const getDrinkPrice = getIdByName.price;

      let numberValue: number = Number(getDrinkPrice);
      totalPrice += detail.quantity * numberValue;

      const getName = await this.prisma.drinksDetails.findMany({
        where: {
          drink_id: getIdByName.drink_id,
        },
        select: {
          ingredient_weight: true,
          ingredient: {
            select: {
              ingredient_name: true,
            },
          },
        },
      });

      const ingredientWeights = getName.map(item => item.ingredient_weight * detail.quantity);
      const getIngredientName = getName.map(item => item.ingredient.ingredient_name)

      const currentStorages = await this.prisma.storage.findMany({
        where: {
          goods_name: { in: getIngredientName }
        },
        select: {
          storage_id: true,
          goods_name: true,
          quantity: true,
          goods_unit: true,
          equipmenttype_id: true
        }
      });

      const countQuantity = currentStorages.filter(storage => storage.quantity > 0).length;
      if (countQuantity < getIngredientName.length) {
        throw new Error("Not enough quantity");
      }

      const updatePromises = currentStorages.map(async storage => {
        const currentQuantity = storage.quantity; // Lấy ra quantity hiện tại
        const index = currentStorages.findIndex(item => item.goods_name === storage.goods_name);
        const updatedQuantity = currentQuantity - ingredientWeights[index]; // Cập nhật quantity mới
        return this.prisma.storage.update({
          where: {
            storage_id: storage.storage_id
          },
          data: {
            quantity: updatedQuantity
          }
        });
      });
      await this.prisma.billDetails.create({
        data: {
          drink_id: getIdDrink,
          bill_id: newBill.bill_id,
          quantity: detail.quantity,
          price: getDrinkPrice
        }
      });
      await Promise.all(updatePromises);
    }
    const bill = await this.prisma.bill.update({
      where: {
        bill_id: newBill.bill_id,
      },
      data: {
        total_price: totalPrice,
      },
    });
    return bill;
  }

  findAll() {
    return this.prisma.bill.findMany({
      include: {
        billdetails: {
          include: {
            drink: true
          }
        }
      }
    });
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

  // remove(id: number) {
  //   return this.prisma.bill.delete({ where: { bill_id: id } });
  // }

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
