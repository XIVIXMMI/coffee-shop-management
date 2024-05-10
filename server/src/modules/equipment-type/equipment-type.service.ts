import { Injectable } from '@nestjs/common';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class EquipmentTypeService {
  constructor (private prisma: PrismaService) {}

  async create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    const {equipmenttype_name} = createEquipmentTypeDto;
    const type = await this.prisma.equipmentType.create({
      data: {
        equipmenttype_name
      }
    })
    return type;
  }

  displayError(){
    throw new ErrorCustom(ERROR_RESPONSE.EquipmentTypeIsNotExisted);
  }

  findAll() {
    return this.prisma.equipmentType.findMany();
  }

  async findObject(id: number){
    const find = await this.prisma.equipmentType.findUnique({
      where: {
        equipmenttype_id: id
      }
    });
    if(!find){
      return false;
    }else {
      return true;
    }
  }

  async findOne(id: number) {
    const type = await this.prisma.equipmentType.findUnique({
      where: {
        equipmenttype_id: id
      }
    });
    if(!type){
      this.displayError();
    }
    return type;
  }

  async update(id: number, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    const findType = await this.findObject(id);
    if(!findType){
      this.displayError();
    }
    const type = await this.prisma.equipmentType.update({
      where : {equipmenttype_id: id},
      data: updateEquipmentTypeDto
    });
    return type;
  }

  async remove(id: number) {
    const findType = await this.findObject(id);
    if(!findType){
      this.displayError();
    }
    const type = await this.prisma.equipmentType.delete({where: {equipmenttype_id: id}});
    return type;
  }
}
