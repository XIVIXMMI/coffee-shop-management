import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class UpdateDrinkDto {

    @IsString()
    drink_name: string;

    @IsNumber()
    price: number;

    @IsArray()
    @IsNotEmpty()
    drink_details: DrinkDetails[];
}

export class DrinkDetails {

    @IsNotEmpty()
    @IsNumber()
    ingredient_id: number

    @IsNotEmpty()
    ingredient_weight: number
}