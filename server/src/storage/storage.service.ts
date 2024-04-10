import { Injectable } from '@nestjs/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StorageService {
  constructor(private prisma: PrismaService) {}

  async create(createStorageDto: CreateStorageDto) {
    const {goods_name,arrival_date,cost_price,quantity,goods_unit} = createStorageDto;
    const newGoods = await this.prisma.storage.create({
      data: {
        goods_name,
        arrival_date,
        cost_price,
        quantity,
        goods_unit,
        user_id: 3
      },
    });
    return newGoods;
  }

  findAll() {
    return this.prisma.storage.findMany();
  }

  async findOne(id: number) {
    const goods = await this.prisma.storage.findUnique({
      where: {storage_id: id}
    })
    return goods;
  }

  update(id: number, updateStorageDto: UpdateStorageDto) {
    return this.prisma.storage.update({
      where: {storage_id: id},
      data: updateStorageDto
    });
  }

  remove(id: number) {
    return this.prisma.storage.delete({where: {storage_id: id}});
  }
}
