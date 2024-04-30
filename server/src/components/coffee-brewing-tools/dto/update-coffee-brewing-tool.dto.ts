import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeBrewingToolDto } from './create-coffee-brewing-tool.dto';
import { IsString } from 'class-validator';

export class UpdateCoffeeBrewingToolDto extends PartialType(CreateCoffeeBrewingToolDto) {

    @IsString()
    brewingtool_name?: string;
}
