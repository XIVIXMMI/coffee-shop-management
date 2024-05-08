import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateShopEquipmentDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example:'Commercial Microwave', description: 'Name of the item' })
    equipment_name: string;
}
