import { Injectable } from '@nestjs/common';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EquipmentTypeService {
  constructor (private prisma: PrismaService) {}

  async create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    const {equipmenttype_name} = createEquipmentTypeDto;
    const newType = await this.prisma.equipmentType.create({
      data: {
        equipmenttype_name
      }
    })
    return newType;
  }

  findAll() {
    return this.prisma.equipmentType.findMany();
  }

  async findOne(id: number) {
    const type = await this.prisma.equipmentType.findUnique({
      where: {
        equipmenttype_id: id
      }
    });
    return type;
  }

  update(id: number, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    return this.prisma.equipmentType.update({
      where : {equipmenttype_id: id},
      data: updateEquipmentTypeDto
    });
  }

  remove(id: number) {
    return this.prisma.equipmentType.delete({where: {equipmenttype_id: id}});
  }
}
