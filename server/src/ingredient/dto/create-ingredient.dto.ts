import { IsNotEmpty, IsString } from "class-validator";

export class CreateIngredientDto {

    @IsNotEmpty()
    @IsString()
    ingredient_name: string;
}
