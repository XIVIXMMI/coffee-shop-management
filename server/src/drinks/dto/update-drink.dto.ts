import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateDrinkDto {

    @IsString()
    drink_name: string;

    @IsNumber()
    price: number;

    image_url: string

    @IsArray()
    @IsNotEmpty()
    drink_details: DrinkDetails[];
}

export class DrinkDetails {


    @IsNumber()
    ingredient_id: number


    ingredient_weight: number
}