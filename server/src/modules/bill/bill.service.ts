import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom, SuccessCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class BillService {
  constructor(private prisma: PrismaService) { }

  // TODO: Xử lý ngoại lệ khi nhập 2 item, 1 item đã có trong db và 1 item chưa có trong db
  // TODO: Tạo bill trước khi tạo billdetails nên totalprice = 0
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
        throw new ErrorCustom(ERROR_RESPONSE.NotEnoughWeight);
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
          quantity: +detail.quantity,
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
        total_price: +totalPrice,
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

  displayErrorMessage() {
    throw new ErrorCustom(ERROR_RESPONSE.BillIsNotExisted);
  }

  async findBillById(id: number) {
    const bill = this.prisma.bill.findUnique({
      where: {
        bill_id: id
      }
    });
    if (!bill) {
      this.displayErrorMessage();
    }
    return bill;
  }

  async findOne(id: number) {
    const findBill = this.findBillById(id);
    if (!findBill) {
      this.displayErrorMessage();
    }
    const bill = await this.prisma.bill.findUnique({
      where: {
        bill_id: id
      }
    })
    return bill;
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    const findBill = this.findBillById(id);
    if (!findBill) {
      this.displayErrorMessage();
    }
    return this.prisma.bill.update({
      where: {
        bill_id: id
      },
      data: {
        ...updateBillDto,
        ...(updateBillDto.bill_date && { bill_date: new Date(updateBillDto.bill_date as any) }),
      }
    });
  }



  newupdate(id: number, updateBillDto: UpdateBillDto) {
    const findBill = this.findBillById(id);
    if (!findBill) {
      this.displayErrorMessage();
    }
    return this.prisma.bill.update({
      where: {
        bill_id: id
      },
      data: {
        ...updateBillDto,
        ...(updateBillDto.bill_date && { bill_date: new Date(updateBillDto.bill_date as any) }),
      }
    });
  }

  async remove(id: number) {
    const findBill = await this.prisma.bill.findUnique(
      {
        where:
          { bill_id: id },
        include: {
          billdetails: {
          }
        }
      },

    );
    if (!findBill) {
      throw new ErrorCustom(ERROR_RESPONSE.BillIsNotExisted)
    }

     await Promise.all(findBill.billdetails.map(async (billDetail) => {
      const drinkDetails = await this.prisma.drinksDetails.findMany({
        where: { drink_id: billDetail.drink_id },
        include: { ingredient: { include: { storage: true } } },
      });
      if(!drinkDetails){
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted)
      }

      await Promise.all(drinkDetails.map(async (drinkDetail) => {
        const updatedQuantity = drinkDetail.ingredient.storage.quantity + (drinkDetail.ingredient_weight * billDetail.quantity); // Số lượng nguyên liệu cần cập nhật

        await this.prisma.storage.update({
          where: { storage_id: drinkDetail.ingredient.storage_id },
          data: { quantity: updatedQuantity },
        });
      }))
    }));

    await this.prisma.billDetails.deleteMany({
      where:{
        bill_id: id
      }
    })
    await this.prisma.bill.delete({
      where:{
        bill_id: id
      }
    })
    return new SuccessCustom(SUCCESS_RESPONSE.ResponseSuccess)
  }

  async findDrinkById(drink_id: number) {
    const id = await this.prisma.drink.findFirst({
      where: {
        drink_id
      },
      select: {
        drink_id: true,
        price: true
      }
    })
    if (!id) {
      throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
    }
    return id;
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
    if (!drinkName) {
      throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
    }
    return drinkName;
  }

  async checkIfDrinkExisted(drink_id: number) {
    const drinkId = await this.prisma.drink.findUnique({
      where: {
        drink_id
      }
    });
    return drinkId;
  }

  async statistical(fromDate: string | null, toDate: string | null) {
    // Nếu cả fromDate và toDate đều không có giá trị, trả về tất cả các hóa đơn
    if (!fromDate && !toDate) {
      const allBills = await this.findAll();
      return allBills;
    }

    // Chuyển đổi fromDate và toDate thành đối tượng Date nếu có giá trị
    const fromDateValue = fromDate ? new Date(fromDate) : null;
    const toDateValue = toDate ? new Date(toDate) : null;

    // Điều chỉnh ngày nếu cần
    if (fromDateValue) {
      fromDateValue.setDate(fromDateValue.getDate() - 1);
    }
    if (toDateValue) {
      toDateValue.setDate(toDateValue.getDate() + 1);
    }

    // Truy vấn các hóa đơn trong khoảng thời gian từ fromDate đến toDate
    const listBill = await this.prisma.bill.findMany({
      where: {
        bill_date: {
          gte: fromDateValue || undefined,
          lte: toDateValue || undefined
        },
      },
      include: {
        billdetails: {
          include: {
            drink: true
          }
        }
      }
    });

    // Tính tổng giá trị và số lượng đồ uống
    let totalPriceAll = 0;
    const drinkCounts = {};

    listBill.forEach(bill => {
      totalPriceAll += bill.total_price;
      bill.billdetails.forEach(detail => {
        const drinkName = detail.drink.drink_name;
        if (!drinkCounts[drinkName]) {
          drinkCounts[drinkName] = 0;
        }
        drinkCounts[drinkName] += detail.quantity;
      });
    });

    // Trả về thông tin thống kê
    return {
      totalPriceAll,
      drinkCounts
    };
  }
}
