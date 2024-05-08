import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCoffeeBrewingToolDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Espresso Machine', description: 'name of the item' })
    brewingtool_name: string
}
