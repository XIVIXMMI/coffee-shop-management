import { Injectable } from '@nestjs/common';
import { CreateShopEquipmentDto } from './dto/create-shop-equipment.dto';
import { UpdateShopEquipmentDto } from './dto/update-shop-equipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShopEquipmentService {
  constructor(private prisma: PrismaService) { }

  async create(createShopEquipmentDto: CreateShopEquipmentDto) {
    const { equipment_name } = createShopEquipmentDto;
    const newEquipment = await this.prisma.shopEquipment.create({
      data: {
        storage_id: 14,
        equipment_name,
        equipmenttype_id: 1
      }
    })
    return newEquipment;
  }

  findAll() {
    return this.prisma.shopEquipment.findMany()
  }

  async findOne(id: number) {
    const user = await this.prisma.shopEquipment.findUnique({
      where: {
        equipment_id: id
      }
    });
    return user;
  }

  update(id: number, updateShopEquipmentDto: UpdateShopEquipmentDto) {
    return this.prisma.shopEquipment.update({
      where : {equipment_id: id},
      data: updateShopEquipmentDto
    });
  }

  remove(id: number) {
    return this.prisma.shopEquipment.delete({where: {equipment_id: id}});
  }
}
