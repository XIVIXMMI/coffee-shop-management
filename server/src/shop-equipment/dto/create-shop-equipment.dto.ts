import { IsNotEmpty, IsString } from "class-validator";

export class CreateShopEquipmentDto {

    @IsNotEmpty()
    @IsString()
    equipment_name: string;
}
