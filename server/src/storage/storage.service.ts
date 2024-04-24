import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) { }

  async create(createStorageDto: CreateStorageDto, createdBy: number) {
    const { goods_name, arrival_date, cost_price, quantity, goods_unit, equipment_type } = createStorageDto;

    let newGoods; // Chuyển từ var sang let để đảm bảo scope hợp lệ
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
          arrival_date: new Date(), // Cập nhật ngày thêm mới
        }
      });
    } else {
      // Nếu không tìm thấy mục, tạo một mục mới
      newGoods = await this.prisma.storage.create({
        data: {
          ...createStorageDto,
          equipmenttype_id: createStorageDto.equipment_type,
          created_by: createdBy,
          deleted: false
        }
      });
    }

    // Kiểm tra nếu newGoods được gán giá trị trước khi truy cập vào thuộc tính storage_id
    if (newGoods) {
      if (equipment_type === 1) {
        await this.prisma.ingredient.create({
          data: {
            storage_id: newGoods.storage_id,
            ingredient_name: goods_name
          }
        });
      } else if (equipment_type === 2) {
        await this.prisma.coffeeBrewingTool.create({
          data: {
            storage_id: newGoods.storage_id,
            brewingtool_name: goods_name
          }
        });
      } else if (equipment_type === 3) {
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

  async findOne(id: number) {
    const goods = await this.prisma.storage.findUnique({
      where: {
        storage_id: id,
        deleted: false
      }
    })
    return goods;
  }

  update(id: number, updateStorageDto: UpdateStorageDto) {
    return this.prisma.storage.update({
      where: { storage_id: id },
      data: updateStorageDto
    });
  }

  softDelete(id: number) {
    return this.prisma.storage.update({
      where: { storage_id: id },
      data: { deleted: true }
    })
  }


  remove(id: number) {
    return this.prisma.storage.delete({ where: { storage_id: id } });
  }
}
