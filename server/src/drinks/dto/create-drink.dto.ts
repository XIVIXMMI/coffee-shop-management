import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";
import { Ingredient } from "src/ingredient/entities/ingredient.entity";

export class CreateDrinkDto {

    @IsNotEmpty()
    @IsString()
    drink_name: string;

    @IsNotEmpty()
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
    @IsNumber()
    ingredient_weight: number
}
