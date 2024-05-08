import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIngredientDto {

    @IsString()
    @ApiProperty({ example: 'White Suggar', description: 'Name of the ingredient' })
    ingredient_name: string;
}
