import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class CreateDrinkDto {

    @IsNotEmpty()
    @IsString()
    drink_name: string;

    @IsNotEmpty()
    price: number;

    image_url: string;

    drink_details: DrinkDetails[];
}

export class DrinkDetails {

    @IsNotEmpty()
    ingredient_id:number;

    @IsNotEmpty()
    @IsNumber()
    ingredient_weight: number;
}
