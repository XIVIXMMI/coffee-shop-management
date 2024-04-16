import { IsNotEmpty, IsString } from "class-validator";

export class CreateEquipmentTypeDto {

    @IsNotEmpty()
    @IsString()
    equipmenttype_name: string;
}
