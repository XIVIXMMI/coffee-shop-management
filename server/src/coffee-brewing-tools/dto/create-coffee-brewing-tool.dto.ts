import { IsNotEmpty, IsString } from "class-validator";

export class CreateCoffeeBrewingToolDto {

    @IsNotEmpty()
    @IsString()
    brewingtool_name: string
}
