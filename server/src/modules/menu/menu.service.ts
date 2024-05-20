import { Injectable } from '@nestjs/common';
import { CreateMenuDto, MenuDetails } from './dto/create-menu.dto';
import { UpdateMenuDto, UpdateMenuDetailDto } from './dto/update-menu.dto';
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

  displayError(){
    throw new ErrorCustom(ERROR_RESPONSE.MenuIsNotExisted)
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

  async updateMenuDetails(id: number, updateMenuDetailDto: UpdateMenuDetailDto) {
    let updateNameMenu

    if (updateMenuDetailDto.menu_name) {
      updateNameMenu = await this.prisma.menu.update({
        where: {
          menu_id: +id
        },
        data: {
          menu_name: updateMenuDetailDto.menu_name
        }
      })
    }

    if (!updateMenuDetailDto || !updateMenuDetailDto.menu_details) {
      throw new Error('Invalid data provided');
    }
    const updateMenuDetails = updateMenuDetailDto.menu_details.map(async (items) => {
      const checkDrinkDetails = await this.prisma.menuDetails.findMany({
        where: {
          menu_id: +id,
          drink_id: +items.drink_id
        }
      });

      const listAll = await this.displayMenuItem(id)
      const checkDB = listAll.menudetails.filter(checks => checks.drink_id === +items.drink_id_update)
      if (checkDrinkDetails) {
        if (checkDB.length === 0) {
          const listUpdate = await this.prisma.menuDetails.update({
            where: {
              menu_id_drink_id: {
                menu_id: +id,
                drink_id: +items.drink_id
              }
            },
            data: {
              drink_id: +items.drink_id_update
            }
          })
          return listUpdate
        }
        else {
          throw new ErrorCustom(ERROR_RESPONSE.BillIsNotExisted)
        }
      }
      else {
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted)
      }
    })
    const updatedDetails = await Promise.all(updateMenuDetails);
    return {
      updateNameMenu,
      updatedDetails
    };

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
        menu_id: +id
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

  async removeMenuDetails(id: number){
    try{

      await this.checkIfMenuExisted(id);

      const removeDetails = await this.prisma.menuDetails.deleteMany({
        where: {
          menu_id: id
        }
      });

      return removeDetails;

    }catch (error){
      console.log('Error deleting recipe: ',error.message);
      throw new ErrorCustom(ERROR_RESPONSE.DeletingFailed)
    }
  }

  async checkIfMenuExisted(id: number){
    const findMenu = await this.prisma.menu.findUnique({
      where: {
        menu_id: id
      }
    });
    if(!findMenu){
      this.displayError();
    }
    return findMenu;
  }
  
  async displayMenuDetails() {
    const getMenuItem = await this.prisma.menu.findMany({
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
    return getMenuItem;
  }
}