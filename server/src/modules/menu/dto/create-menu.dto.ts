import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMenuDto {

    @ApiProperty({ example: 'Coffee Menu', description: 'Name of the coffee' })
    @IsNotEmpty()
    @IsString()
    menu_name: string;

    @ApiProperty({ example: 1, description: 'Drink ID of the menu' })
    @IsArray()
    @IsNotEmpty()
    menu_details: MenuDetails[];
}

export class MenuDetails {

    @IsNotEmpty()
    @IsNumber()
    drink_id: number;
}