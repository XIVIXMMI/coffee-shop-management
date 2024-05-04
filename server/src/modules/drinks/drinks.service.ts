import { Injectable } from '@nestjs/common';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';
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

      for (let drinkDetails of createDrinkDto.drink_details) {
        const ingredientWeightInKg = drinkDetails.ingredient_weight / 1000;
        const a = await this.prisma.drinksDetails.create({
          data: {
            drink_id: newDrinks.drink_id,
            ingredient_id: +drinkDetails.ingredient_id,
            ingredient_weight: +ingredientWeightInKg
          }
        });
      }
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
    for (let drinkDetails of updateDrinkDto.drink_details) {
      // Chỉ nhập gram ko nhập kg
      const ingredientWeightInKg = drinkDetails.ingredient_weight / 1000;
      await this.prisma.drinksDetails.update({
        where: { drink_id_ingredient_id: { drink_id: id, ingredient_id: drinkDetails.ingredient_id } },
        data: {
          ingredient_weight: ingredientWeightInKg,
        },
      });
    }
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
    const deletePromises = removeDrinkDetails.map(async item =>
      await this.prisma.drinksDetails.delete({
        where: {
          drink_id_ingredient_id: {
            drink_id: item.drink_id,
            ingredient_id: item.ingredient_id
          }
        }
      })
    );
    await Promise.all(deletePromises);
    return this.prisma.drink.delete({ where: { drink_id: id } });

  }

}
