import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsDecimal, IsDate, IsNotEmpty, IsDateString, IsNumber, IsEnum } from 'class-validator';

enum GoodsUnit {
    Kilogram = 'Kilogram',
    Gram = 'Gram',
    Litter = 'Litter',
    Unit = 'Unit',
    Houseware = 'Houseware'
}

export class CreateStorageDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Coffee Beans', description: 'Name of the item' })
    goods_name: string;

    // @IsNotEmpty()
    // @IsDateString()
    // @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Arrival date of the item' })
    // arrival_date: Date;

    @IsNotEmpty()
   // @IsNumber()
    @ApiProperty({ example: '180000.0', description: 'Price of single item' })
    cost_price: number;

    @IsNotEmpty()
   // @IsInt()
    @ApiProperty({ example: '10', description: 'Quantity of the item' })
    quantity: number;

   // @IsEnum(GoodsUnit)
    @ApiProperty({ example: 'kilogram', description: 'Weight/Unit of the item' })
    goods_unit: GoodsUnit;

     @IsNotEmpty()
    //@IsInt()
    @ApiProperty({ example: '1', description: 'Type of the item' })
    equipmenttype_id: number;

}

