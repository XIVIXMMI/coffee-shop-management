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
    const { goods_name, arrival_date, cost_price, quantity, goods_unit, equipmenttype_id } = createStorageDto;

    let newGoods; 
    const existingItem = await this.prisma.storage.findFirst({
      where: {
        goods_name: createStorageDto.goods_name
      }
    });

    if (existingItem) {
      await this.prisma.storage.update({
        where: {
          storage_id: existingItem.storage_id
        },
        data: {
          quantity: existingItem.quantity + createStorageDto.quantity,
          arrival_date: new Date(), 
        }
      });
    } else {
      // Nếu không tìm thấy mục, tạo một mục mới
      newGoods = await this.prisma.storage.create({
        data: {
          ...createStorageDto,
          equipmenttype_id: createStorageDto.equipmenttype_id,
          created_by: createdBy,
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

  displayError(){
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
    if(!findItem){
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
    if(!findItem){
      this.displayError();
    }
    const update = this.prisma.storage.update({
      where: { storage_id: id },
      data: updateStorageDto
    });
    return update;
  }

  async softDelete(id: number) {
    const findItem = await this.findObject(id);
    if(!findItem){
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
    if(!findItem){
      this.displayError();
    }
    const remove = this.prisma.storage.delete({ where: { storage_id: id } });
    return remove;
  }
}
