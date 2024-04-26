import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Drink } from 'src/drinks/entities/drink.entity';

@Injectable()
export class MenuService {
  constructor (private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    const {menu_name } = createMenuDto;
    const menu = await this.prisma.menu.create({
      data: {
        menu_name
      }
    });
    for (let menuDetails of createMenuDto.menu_details) {
      await this.prisma.menuDetails.create({
        data: {
          menu_id: menu.menu_id,
          drink_id: menuDetails.drink_id,

        }
      })
    }
    return menu;
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
