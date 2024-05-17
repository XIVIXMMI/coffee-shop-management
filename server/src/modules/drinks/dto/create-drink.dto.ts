import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsInt } from "class-validator";

export class DrinkDetailsDto {

    @ApiProperty({ description: 'The ID of the drink', example: 1, format: 'number' })
    @IsNotEmpty()
    @IsNumber()
    drink_id: number;

    @ApiProperty({ description: 'The ID of the ingredient', example: 1, format: 'number' })
    @IsNotEmpty()
    @IsNumber()
    ingredient_id: number;

    @ApiProperty({ description: 'The weight of the ingredient in grams', example: 50, format: 'number' })
    @IsNotEmpty()
    @IsNumber()
    ingredient_weight: number;
}

export class CreateDrinkDto {

    @ApiProperty({ description: 'The name of the drink', example: 'Coffee', format: 'string' })
    @IsNotEmpty()
    @IsString()
    drink_name: string;

    @ApiProperty({ description: 'The price of the drink', example: 30000, format: 'number' })
    @IsNotEmpty()
    price: number;

    @ApiProperty({ type: 'string', format: 'binary', description: 'The image file of the drink' })
    image_url: string;
}

export class CreateDrinkDetailsDto {


    @ApiProperty({ example: 1, description: 'The ID of Drink'})
    @IsInt()
    drink_id: number;

    @ApiProperty({ type: [DrinkDetailsDto], description: 'Details of the ingredients of the drink', format: 'array' })
    drink_details: DrinkDetailsDto[];

}