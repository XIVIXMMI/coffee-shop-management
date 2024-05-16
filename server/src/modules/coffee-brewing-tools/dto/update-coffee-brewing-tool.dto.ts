import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeBrewingToolDto } from './create-coffee-brewing-tool.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoffeeBrewingToolDto extends PartialType(CreateCoffeeBrewingToolDto) {

    @ApiProperty({ example: 'Espresso Machine', description: 'name of the item' })
    brewingtool_name?: string;
}
