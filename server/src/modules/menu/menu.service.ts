import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDetailDto, UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) { }

  async create(createMenuDto: CreateMenuDto) {
    const { menu_name } = createMenuDto;
    const menu = await this.prisma.menu.create({
      data: {
        menu_name
      }
    });

    let validCount = 0;

    for (let menuDetails of createMenuDto.menu_details) {
      const addDrinks = await this.prisma.drink.findMany({
        where: {
          drink_id: menuDetails.drink_id
        },
        select: {
          drink_id: true,
          drink_name: true,
          price: true
        }
      });

      validCount += addDrinks.filter(item => item.price > 0).length

      await this.prisma.menuDetails.create({
        data: {
          menu_id: menu.menu_id,
          drink_id: menuDetails.drink_id,

        }
      })
    }

    if (validCount != createMenuDto.menu_details.length) {
      throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
    }
    return menu;
  }

  findAll() {
    return this.prisma.menu.findMany();
  }

  // async findOne(id: number) {
  //   const menu = await this.prisma.menu.findUnique({
  //     where: {
  //       menu_id: id
  //     }
  //   });
  //   return menu;
  // }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    return await this.prisma.menu.update({
      where: {
        menu_id: id
      },
      data: {
        menu_name: updateMenuDto.menu_name
      }
    });
  }

  async updateMenuDetails(updateMenuDetails: UpdateMenuDetailDto, drink_id: number, menu_id: number) {
    const { menu_id_input, drink_id_input } = updateMenuDetails;
    const menu = await this.prisma.menuDetails.update({
      where: {
        menu_id_drink_id: {
          drink_id,
          menu_id
        }
      },
      data: {
        menu_id: menu_id_input,
        drink_id: drink_id_input
      }
    });
    return menu;
  }

  async remove(id: number) {
    return await this.prisma.menu.delete({
      where: {
        menu_id: id
      }
    });
  }

  async displayMenuItem(id: number) {
    const getMenuItem = await this.prisma.menu.findUnique({
      where: {
        menu_id: id
      },
      include: {
        menudetails: {
          include: {
            drink: true
          }
        }
      }
    });
    if (!getMenuItem) {
      throw new ErrorCustom(ERROR_RESPONSE.MenuIsNotExisted);
    }
    const hasDetails = getMenuItem.menudetails.some(item => item.drink);

    if (!hasDetails) {
      throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
    }

    return getMenuItem;
  }
}