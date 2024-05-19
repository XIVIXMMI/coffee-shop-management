import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DrinkDetailsDto {

    @ApiProperty({ description: 'The ID of the ingredient', example: 1 })
    ingredient_id: number;

    @ApiProperty({ description: 'The weight of the ingredient in grams', example: 50 })
    ingredient_weight: number;

    ingredient_id_update: number
}

export class UpdateDrinkDto {

    @ApiProperty({ description: 'The name of the drink', example: 'Coffee' })
    drink_name: string;

    @ApiProperty({ description: 'The price of the drink', example: 30000 })
    price: number;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'The image file of the drink'
    })
    image_url: string;
}

export class UpdateDrinkDetailDto {
    @ApiProperty({ type: [DrinkDetailsDto], description: 'Details of the ingredients of the drink' })
    drink_details: DrinkDetailsDto[];
}