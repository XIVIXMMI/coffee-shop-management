import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) { }

  async create(createStorageDto: CreateStorageDto, createdBy: number) {
    const { goods_name, cost_price, quantity, goods_unit, equipmenttype_id } = createStorageDto;

    let newGoods;
    const existingItem = await this.prisma.storage.findFirst({
      where: {
        goods_name: createStorageDto.goods_name
      }
    });

    if (existingItem) {
      const updateStorage=  await this.prisma.storage.update({
        where: {
          storage_id: existingItem.storage_id
        },
        data: {
          quantity: existingItem.quantity + createStorageDto.quantity,
          cost_price: +createStorageDto.cost_price,
          arrival_date: new Date(),
        }
      });
      return updateStorage
    } else {
      // Nếu không tìm thấy mục, tạo một mục mới
      newGoods = await this.prisma.storage.create({
        data: {
          ...createStorageDto,
          equipmenttype_id: createStorageDto.equipmenttype_id,
          created_by: createdBy,
          arrival_date:new Date(),
          cost_price:+createStorageDto.cost_price,
          deleted: false
        }
      });
    }

    // Kiểm tra nếu newGoods được gán giá trị trước khi truy cập vào thuộc tính storage_id
    if (newGoods) {
      if (equipmenttype_id === 1) {
        await this.prisma.ingredient.create({
          data: {
            storage_id: newGoods.storage_id,
            ingredient_name: goods_name
          }
        });
      } else if (equipmenttype_id === 2) {
        await this.prisma.coffeeBrewingTool.create({
          data: {
            storage_id: newGoods.storage_id,
            brewingtool_name: goods_name
          }
        });
      } else if (equipmenttype_id === 3) {
        await this.prisma.shopEquipment.create({
          data: {
            storage_id: newGoods.storage_id,
            equipment_name: goods_name
          }
        });
      }
    }
    return newGoods;
  }


  findAll() {
    return this.prisma.storage.findMany({
      where: {
        deleted: false
      }
    });
  }

  displayError() {
    throw new ErrorCustom(ERROR_RESPONSE.ItemIsNotExisted);
  }

  async findObject(id: number) {
    const find = await this.prisma.storage.findUnique({
      where: {
        storage_id: id,
        deleted: false
      }
    });
    if (!find) {
      return false;
    } else {
      return true;
    }
  }

  async findOne(id: number) {
    const findItem = await this.findObject(id);
    if (!findItem) {
      this.displayError();
    }
    const goods = await this.prisma.storage.findUnique({
      where: {
        storage_id: id,
        deleted: false
      }
    })
    return goods;
  }

  async update(id: number, updateStorageDto: UpdateStorageDto) {
    const findItem = await this.findObject(id);
    if (!findItem) {
      this.displayError();
    }
    const update = this.prisma.storage.update({
      where: { storage_id: id },
      data: {
        ...updateStorageDto,
        cost_price: +updateStorageDto.cost_price,
        quantity: +updateStorageDto.quantity,
        equipmenttype_id: +updateStorageDto.equipmenttype_id,
        ...(updateStorageDto.arrival_date && {arrival_date: new Date (updateStorageDto.arrival_date as any)})
      }
    });
    return update;
  }

  async softDelete(id: number) {
    const findItem = await this.findObject(id);
    if (!findItem) {
      this.displayError();
    }
    const hideItem = await this.prisma.storage.update({
      where: { storage_id: id },
      data: { deleted: true }
    });
    return hideItem;
  }

  async remove(id: number) {
    const findItem = await this.findObject(id);
    if (!findItem) {
      this.displayError();
    }
    const remove = this.prisma.storage.delete({ where: { storage_id: id } });
    return remove;
  }

  async statistical(fromDate: string | null, toDate: string | null) {
    // Nếu cả fromDate và toDate đều không có giá trị, trả về tất cả các mặt hàng trong kho
    if (!fromDate && !toDate) {
      const allStorageItems = await this.prisma.storage.findMany();
      return this.calculateStorageStatistics(allStorageItems);
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

    // Truy vấn các mặt hàng trong kho trong khoảng thời gian từ fromDate đến toDate
    const storageItems = await this.prisma.storage.findMany({
      where: {
        arrival_date: {
          gte: fromDateValue || undefined,
          lte: toDateValue || undefined
        },
      }
    });
    return this.calculateStorageStatistics(storageItems);
  }

  public calculateStorageStatistics(storageItems: any[]) {
    let totalQuantityAll = 0;
    let totalCostPriceAll = 0;
    const goodsCounts = {};

    storageItems.forEach(item => {
      totalQuantityAll += item.quantity;
      totalCostPriceAll += item.quantity * item.cost_price;

      const goodsName = item.goods_name;
      if (!goodsCounts[goodsName]) {
        goodsCounts[goodsName] = {
          quantity: 0,
          totalCostPrice: 0
        };
      }
      goodsCounts[goodsName].quantity += item.quantity;
      goodsCounts[goodsName].totalCostPrice += item.quantity * item.cost_price;
    });

    return {
      totalQuantityAll,
      totalCostPriceAll,
      goodsCounts
    };
  }

}
