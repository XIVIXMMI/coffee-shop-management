import { PartialType } from '@nestjs/mapped-types';
import { CreateShopEquipmentDto } from './create-shop-equipment.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShopEquipmentDto extends PartialType(CreateShopEquipmentDto) {

    @IsString()
    @ApiProperty({example:'Commercial Microwave', description: 'Name of the item' })
    equipment_name?: string;
}
