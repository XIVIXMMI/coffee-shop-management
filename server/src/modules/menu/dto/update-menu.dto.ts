import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDetailDto {

    @ApiProperty({ example: 'Coffee Menu', description: 'Name of the coffee' })
    menu_id_input: number;

    @ApiProperty({ example: 1, description: 'Drink ID of the menu' })
    drink_id_input: number;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {

}