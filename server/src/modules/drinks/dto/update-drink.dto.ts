import { IsArray, IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";



export class UpdateDrinkDto {

    @IsString()
    drink_name: string;

    @IsInt()
    price: number;

    image_url: string

    @IsArray()
    @IsNotEmpty()
    drink_details: DrinkDetails[];
}

export class DrinkDetails {


    @IsInt()
    ingredient_id: number

    @IsInt()
    ingredient_weight: number
}