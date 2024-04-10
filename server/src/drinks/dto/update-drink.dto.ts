import { IsNumber, IsString } from "class-validator";


export class UpdateDrinkDto {

    @IsString()
    drink_name: string;

    @IsNumber()
    price: number;
}
