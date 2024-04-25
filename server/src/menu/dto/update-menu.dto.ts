import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {

    @IsString()
    menu_name: string;

    @IsArray()
    menu_details: MenuDetails[];
}

export class MenuDetails {


    @IsNumber()
    drink_id: number;

}