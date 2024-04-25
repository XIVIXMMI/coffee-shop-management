import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class CreateDrinkDto {

    @IsNotEmpty()
    @IsString()
    drink_name: string;

    @IsNotEmpty()
    price: number;

    image_url: string;

    @IsArray()
    @IsNotEmpty()
    drink_details: DrinkDetails[];
}

export class DrinkDetails {

    @IsNotEmpty()
    @IsNumber()
    ingredient_id: number

    @IsNotEmpty()
    @IsNumber()
    ingredient_weight: number
}
