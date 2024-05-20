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

  async update(id: number, updateDrinkDto: UpdateDrinkDto, image_url: Express.Multer.File) {
    let imageUrl: string | undefined;
    if (image_url) {
      // Upload the image to Cloudinary and get the secure URL if an image is provided
      const imageUploadResult = await this.cloudinaryService.uploadFile(image_url);
      imageUrl = imageUploadResult.secure_url;


    }
    const updateDrink = await this.prisma.drink.update({
      where: {
        drink_id: id
      },
      data: {
        ...updateDrinkDto,
        ...(updateDrinkDto.price && { price: parseFloat(updateDrinkDto.price as any) }),
        ...(imageUrl && { image_url: imageUrl })
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
      if (!createDrinkDetail || !Array.isArray(createDrinkDetail.drink_details)) {
        throw new Error('Invalid input data: drink_details is not defined or not an array');
      }
      const drinkId = createDrinkDetail.drink_id;
      const createDetailsPromises = createDrinkDetail.drink_details.map(async (item) => {
        // Check if the ingredient already exists for the given drink
        const existingDetail = await this.prisma.drinksDetails.findUnique({
          where: {
            drink_id_ingredient_id: {
              drink_id: +drinkId,
              ingredient_id: item.ingredient_id,
            }
          }
        });
        if (existingDetail) {
          throw new Error(`Ingredient with ID ${item.ingredient_id} already exists for drink with ID ${item.drink_id}`);
        }
        // Create the drink detail if it doesn't exist
        const ingredientWeightInKg = +item.ingredient_weight / 1000;
        return await this.prisma.drinksDetails.create({
          data: {
            drink_id: +drinkId,
            ingredient_id: item.ingredient_id,
            ingredient_weight: +ingredientWeightInKg
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

  async findAllDrinkDetails() {
    const drinkDetails = await this.prisma.drinksDetails.findMany(
      //   {
      //   include: {
      //     drink: true,
      //     ingredient: true
      //   }
      // }
    );

    const formattedDetails = drinkDetails.reduce((accumulator, currentValue) => {
      const { drink_id, ingredient_id, ingredient_weight } = currentValue;
      let details = accumulator.find(item => item.drink_id === drink_id);

      // Nếu không tìm thấy drink_id trong acc tạo mới một đối tượng {drink_id, drink_details: []} và đẩy vào accumulator
      if (!details) {
        details = { drink_id, drink_details: [] };
        accumulator.push(details);
      }

      details.drink_details.push({
        ingredient_id,
        ingredient_weight
      });

      return accumulator;
    }, []);
    return formattedDetails;
  }

  async updateDrinkDetailDto(drink_id: number, updateDrinkDetailDto: UpdateDrinkDetailDto) {
    try {
      if (!updateDrinkDetailDto || !updateDrinkDetailDto.drink_details) {
        throw new Error('Invalid data provided');
      }

      const updateDrinkDetails = updateDrinkDetailDto.drink_details.map(async (items) => {
        const ingredientWeightInKg = +items.ingredient_weight / 1000;
          const checkDrinkDetails = await this.prisma.drinksDetails.findMany({
            where: {
              drink_id: +drink_id,
              ingredient_id: +items.ingredient_id
            }
          })
          const listAllDrinkDetails = await this.lisAllDrink(drink_id)
          const checkDB = listAllDrinkDetails.drinkdetails.filter(checks => checks.ingredient_id === +items.ingredient_id_update)
          if(checkDrinkDetails){
            // if(checkDB.length ===0){
              const listUpdate = await this.prisma.drinksDetails.update({
                where:{
                  drink_id_ingredient_id:{          
                        drink_id: +drink_id,
                        ingredient_id: +items.ingredient_id
                  }
                },
                data:{
                  // ingredient_weight: +ingredientWeightInKg || null,
                  // ingredient_id: +items.ingredient_id_update,
                  ...(items.ingredient_weight && {ingredient_weight: parseFloat(ingredientWeightInKg as any)}),
                  ...(items.ingredient_id_update && {ingredient_id: parseInt(items.ingredient_id_update as any)})
                }
              })
              return listUpdate
            //}
            // else{
            //   throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted)
            // }
          }
          else{
            throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted)
          }
        
      
      })
      const updated = await Promise.all(updateDrinkDetails)
      return updated

    } catch (error) {
      console.error('Error updating drink details:', error.message);
      throw new Error(`Failed to update drink details: ${error.message}`);
    }
  }


  async lisAllDrink(id: number) {
    const listAllDrinkDetails = await this.prisma.drink.findUnique({
      where: {
        drink_id: +id
      },
      include: {
        drinkdetails: {
          include: {
            drink: true
          }
        }
      }
    })
    return listAllDrinkDetails
  }

  async removeDrinkDetails(drink_id: number) {
    try {
      const findDrink = await this.prisma.drink.findUnique({
        where: {
          drink_id: +drink_id
        }
      });
      if (!findDrink) {
        throw new ErrorCustom(ERROR_RESPONSE.DrinksIsNotExisted);
      }

      const findDrinkDetails = await this.prisma.drinksDetails.findMany({
        where: {
          drink_id: +drink_id,
        }
      });
      if (!findDrinkDetails) {
        throw new ErrorCustom(ERROR_RESPONSE.ItemIsNotExisted);
      }
      
      const removeDetails = await this.prisma.drinksDetails.deleteMany({
        where: {
          drink_id: drink_id,
        }

      });
      return removeDetails;
    } catch (error) {
      console.error('Error deleting drink details:', error.message);
      throw new ErrorCustom(ERROR_RESPONSE.DeletingFailed);
    }
  }

}
