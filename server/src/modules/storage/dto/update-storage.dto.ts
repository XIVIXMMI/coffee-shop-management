import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateStorageDto {

    @ApiProperty({ example: 'Coffee Beans', description: 'Name of the item' })
    goods_name: string;

    @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Arrival date of the item' })
    arrival_date: Date;

    @ApiProperty({ example: '180000.0', description: 'Price of single item' })
    cost_price: number;

    @ApiProperty({ example: '10', description: 'Quantity of the item' })
    quantity: number;

    @ApiProperty({ example: 'kilogram', description: 'Weight/Unit of the item' })
    goods_unit: string;

    @ApiProperty({ example: '1', description: 'Type of the item' })
    equipmenttype_id: number;

    created_by: number;

    deleted_by?: number;

}
