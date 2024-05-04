import { IsAlpha, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMenuDto {

    @IsNotEmpty()
    @IsString()
    menu_name: string;

    @IsArray()
    @IsNotEmpty()
    menu_details: MenuDetails[];
}

export class MenuDetails {

    @IsNotEmpty()
    @IsNumber()
    drink_id: number;
}