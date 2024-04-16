import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentTypeDto } from './create-equipment-type.dto';
import { IsString } from 'class-validator';

export class UpdateEquipmentTypeDto extends PartialType(CreateEquipmentTypeDto) {

    @IsString()
    equipmenttype_name?: string;
}
