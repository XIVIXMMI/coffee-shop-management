import { Injectable } from '@nestjs/common';
import { CreateDrinkDetailsDto, CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDetailDto, UpdateDrinkDto, DrinkDetailsDto } from './dto/update-drink.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { ERROR_RESPONSE } from 'src/common/error.handle';
import { ErrorCustom } from 'src/common/error.custom';

@Injectable()
export class DrinksService {
  constructor(private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) { }

  async create(createDrinkDto: CreateDrinkDto, image_url: Express.Multer.File) {
    try {
      const { drink_name, price } = createDrinkDto;
      if (!image_url) {
        throw new Error("Image is missing");
      }
      const imageUploadResult = await this.cloudinaryService.uploadFile(image_url);
      const imageUrl = imageUploadResult.secure_url;

      const newDrinks = await this.prisma.drink.create({
        data: {
          drink_name,
          price: +price,
          image_url: imageUrl
        },
      });

      // for (let drinkDetails of createDrinkDto.drink_details) {
      //   const ingredientWeightInKg = drinkDetails.ingredient_weight / 1000;
      //   const a = await this.prisma.drinksDetails.create({
      //     data: {
      //       drink_id: newDrinks.drink_id,
      //       ingredient_id: +drinkDetails.ingredient_id,
      //       ingredient_weight: +ingredientWeightInKg
      //     }
      //   });
      // }

      return newDrinks;
    } catch (error) {
      if (image_url && image_url.path) {
        await this.cloudinaryService.deleteImage(image_url.path);
      }
      console.error(`Error creating new drink:`, error);
      throw new Error(`Error creating new drink: ${error.message}`);
    }
  }

  findAll() {
    return this.prisma.drink.findMany();
  }

  findOne(id: number) {
    const drinks = this.prisma.drink.findUnique({
      where: { drink_id: id }
    });
    return drinks;
  }

  async update(id: number, updateDrinkDto: UpdateDrinkDto) {
    const updateDrink = await this.prisma.drink.update({
      where: {
        drink_id: id
      },
      data: {
        drink_name: updateDrinkDto.drink_name,
        price: updateDrinkDto.price
      }
    });
    return updateDrink;
  }

  async remove(id: number) {
    const removeDrinkDetails = await this.prisma.drinksDetails.findMany({
      where: {
        drink_id: id,
      }
    });
    if (!removeDrinkDetails) {
      throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
    }
    return this.prisma.drink.delete({ where: { drink_id: id } });
  }

  async createDrinkDetail(createDrinkDetail: CreateDrinkDetailsDto) {
    try {
      const createDetailsPromises = createDrinkDetail.drink_details.map(async (item) => {
        // Check if the ingredient already exists for the given drink
        const existingDetail = await this.prisma.drinksDetails.findUnique({
          where: {
            drink_id_ingredient_id: {
              drink_id: item.drink_id,
              ingredient_id: item.ingredient_id,
            }
          }
        });
        if (existingDetail) {
          throw new Error(`Ingredient with ID ${item.ingredient_id} already exists for drink with ID ${item.drink_id}`);
        }
        // Create the drink detail if it doesn't exist
        const ingredientWeightInKg = item.ingredient_weight / 1000;
        return await this.prisma.drinksDetails.create({
          data: {
            drink_id: item.drink_id,
            ingredient_id: item.ingredient_id,
            ingredient_weight: ingredientWeightInKg
          }
        });
      });

      const details = await Promise.all(createDetailsPromises);
      return details;
    } catch (error) {
      console.error('Error creating drink details:', error.message);
      throw new Error(`Failed to create drink details: ${error.message}`);
    }
  }

  findAllDrinkDetails(){
    return this.prisma.drinksDetails.findMany({
      include: {
        drink: true,
        ingredient: true
      }
    });
  }

  async updateDrinkDetailDto(drink_id: number, ingredient_id: number, drinksDetails: DrinkDetailsDto) {
    try {
      const findDrink = await this.prisma.drink.findUnique({
        where: {
          drink_id: +drink_id
        }
      });
      if (!findDrink) {
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
      }
      const findIngre = await this.prisma.ingredient.findUnique({
        where: {
          ingredient_id: +ingredient_id
        }
      });
      if (!findIngre) {
        throw new ErrorCustom(ERROR_RESPONSE.IngredientIsNotExisted)
      }
      const findDrinkDetails = await this.prisma.drinksDetails.findUnique({
        where: {
          drink_id_ingredient_id: {
            drink_id: +drink_id, 
            ingredient_id: +ingredient_id
          }
        }
      });
      if(!findDrinkDetails){
        throw new ErrorCustom(ERROR_RESPONSE.ItemIsNotExisted);
      }
      const ingredientWeightInKg = drinksDetails.ingredient_weight / 1000;
      const updatedDrinkDetail = await this.prisma.drinksDetails.update({
        where: {
          drink_id_ingredient_id: {
            drink_id: +drink_id,
            ingredient_id: +ingredient_id
          }
        },
        data: {
          ingredient_id: +drinksDetails.ingredient_id,
          ingredient_weight: +ingredientWeightInKg
        },
      });
      return updatedDrinkDetail;
    } catch (error) {
      console.error('Error updating drink details:', error.message);
      throw new Error(`Failed to update drink details: ${error.message}`);
    }
  }

  async removeDrinkDetails (drink_id: number, ingredient_id: number){
    try {
      const findDrink = await this.prisma.drink.findUnique({
        where: {
          drink_id: +drink_id
        }
      });
      if (!findDrink) {
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
      }
      const findIngre = await this.prisma.ingredient.findUnique({
        where: {
          ingredient_id: +ingredient_id
        }
      });
      if (!findIngre) {
        throw new ErrorCustom(ERROR_RESPONSE.IngredientIsNotExisted)
      }
      const findDrinkDetails = await this.prisma.drinksDetails.findUnique({
        where: {
          drink_id_ingredient_id: {
            drink_id: +drink_id, 
            ingredient_id: +ingredient_id
          }
        }
      });
      if(!findDrinkDetails){
        throw new ErrorCustom(ERROR_RESPONSE.ItemIsNotExisted);
      }
      const removeDetails = await this.prisma.drinksDetails.delete({
        where: {
          drink_id_ingredient_id: {
            drink_id: drink_id,
            ingredient_id: ingredient_id
          }
        }
      });
      return removeDetails;
    } catch (error) {
      console.error('Error deleting drink details:', error.message);
      throw new Error(`Failed to deleting drink details: ${error.message}`);
    }
  }

}
