import { Injectable } from '@nestjs/common';
import { CreateShopEquipmentDto } from './dto/create-shop-equipment.dto';
import { UpdateShopEquipmentDto } from './dto/update-shop-equipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class ShopEquipmentService {
  constructor(private prisma: PrismaService) { }

  // async create(createShopEquipmentDto: CreateShopEquipmentDto) {
  //   const { equipment_name } = createShopEquipmentDto;
  //   const newEquipment = await this.prisma.shopEquipment.create({
  //     data: {
  //       storage_id: 14,
  //       equipment_name,
  //     }
  //   })
  //   return newEquipment;
  // }

  findAll() {
    return this.prisma.shopEquipment.findMany()
  }

  displayError(){
    throw new ErrorCustom(ERROR_RESPONSE.ItemIsNotExisted);
  }

  async findOne(id: number) {
    const item = await this.prisma.shopEquipment.findUnique({
      where: {
        equipment_id: id
      }
    });
    if(!item){
      this.displayError();
    }
    return item;
  }

  async findObject(id: number) {
    const find = await this.prisma.shopEquipment.findUnique({
      where: {
        equipment_id: id,
      }
    });
    if (!find) {
      return false;
    } else {
      return true;
    }
  }

  async update(id: number, updateShopEquipmentDto: UpdateShopEquipmentDto) {
    const findItem = await this.findObject(id);
    if(!findItem){
      this.displayError();
    }
    const update = await this.prisma.shopEquipment.update({
      where : {equipment_id: id},
      data: updateShopEquipmentDto
    });
    return update;
  }

  async remove(id: number) {
    const findItem = await this.findObject(id);
    if(!findItem){
      this.displayError();
    }
    const remove = this.prisma.shopEquipment.delete({where: {equipment_id: id}});
    return remove;
  }
}
