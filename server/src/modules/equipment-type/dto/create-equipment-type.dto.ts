import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEquipmentTypeDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'coffee brewing tools', description: 'name of equipment type'})
    equipmenttype_name: string;
}
