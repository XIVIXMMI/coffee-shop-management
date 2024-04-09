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
    return `This action returns all storage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storage`;
  }

  update(id: number, updateStorageDto: UpdateStorageDto) {
    return `This action updates a #${id} storage`;
  }

  remove(id: number) {
    return `This action removes a #${id} storage`;
  }
}
