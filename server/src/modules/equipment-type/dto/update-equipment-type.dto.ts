import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentTypeDto } from './create-equipment-type.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEquipmentTypeDto extends PartialType(CreateEquipmentTypeDto) {

    @ApiProperty({ example: 'coffee brewing tools', description: 'name of equipment type'})
    equipmenttype_name?: string;
}
