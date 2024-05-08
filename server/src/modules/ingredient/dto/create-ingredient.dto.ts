import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIngredientDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'White Suggar', description: 'Name of the ingredient' })
    ingredient_name: string;
}
