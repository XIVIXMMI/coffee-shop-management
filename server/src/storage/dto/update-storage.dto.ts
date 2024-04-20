import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateStorageDto {
    @IsNotEmpty()
    @IsString()
    goods_name: string;

    @IsNotEmpty()
    @IsDateString()
    arrival_date: Date;

    @IsNotEmpty()
    @IsDecimal()
    cost_price: number;

    @IsNotEmpty()
    @IsInt()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    goods_unit: string;

    @IsNotEmpty()
    @IsInt()
    created_by: number;

    @IsNotEmpty()
    @IsOptional()
    @IsInt()
    deleted_by?: number;
}
