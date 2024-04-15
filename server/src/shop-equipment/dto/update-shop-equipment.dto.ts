import { PartialType } from '@nestjs/mapped-types';
import { CreateShopEquipmentDto } from './create-shop-equipment.dto';
import { IsString } from 'class-validator';

export class UpdateShopEquipmentDto extends PartialType(CreateShopEquipmentDto) {

    @IsString()
    equipment_name?: string;
}
