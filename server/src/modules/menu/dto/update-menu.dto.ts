import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMenuDetailDto {

    @IsNumber()
    menu_id_input: number;

    @IsNumber()
    drink_id_input: number;
}

export class UpdateMenuDto extends PartialType(CreateMenuDto) {

}