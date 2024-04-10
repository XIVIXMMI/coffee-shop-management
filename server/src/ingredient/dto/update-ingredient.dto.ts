import { IsString } from "class-validator";

export class UpdateIngredientDto {

    @IsString()
    ingredient_name: string;
}
