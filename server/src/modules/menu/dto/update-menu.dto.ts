import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto {

    @ApiProperty({ example: 'Coffee Menu', description: 'Name of the coffee' })
    menu_name: string;

}
export class MenuDetails {
    drink_id: number;
    drink_id_update: number
    
}

export class  UpdateMenuDetailDto{

    @ApiProperty({ example: 1, description: 'Drink ID of the menu' })
    menu_details: MenuDetails[];
    menu_name: string
}
