import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateDrinkDto {

    @IsNotEmpty()
    @IsString()
    drink_name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
