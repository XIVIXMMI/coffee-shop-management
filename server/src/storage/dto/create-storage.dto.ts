import { IsOptional, IsInt, IsString, IsDecimal, IsDate, IsNotEmpty, IsDateString, IsNumber, IsEnum } from 'class-validator';

enum GoodsUnit {
    KILOGRAM = 'kilogram',
    GRAM = 'gram',
    LITTER = 'litter',
    UNIT = 'unit',
    HOUSEWARE = 'houseware'
}

export class CreateStorageDto {
    @IsNotEmpty()
    @IsString()
    goods_name: string;

    @IsNotEmpty()
    @IsDateString()
    arrival_date: Date;

    @IsNotEmpty()
    @IsNumber()
    cost_price: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;

    @IsEnum(GoodsUnit)
    goods_unit: GoodsUnit;

    // @IsNotEmpty()
    // @IsInt()
    // created_by: number;

}

