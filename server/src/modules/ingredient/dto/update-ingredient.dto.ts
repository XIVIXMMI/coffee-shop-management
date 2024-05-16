import { ApiProperty } from "@nestjs/swagger";

export class UpdateIngredientDto {

    @ApiProperty({ example: 'White Suggar', description: 'Name of the ingredient' })
    ingredient_name: string;
}
