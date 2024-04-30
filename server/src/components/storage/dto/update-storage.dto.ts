import { IsDateString, IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateStorageDto {
    @IsNotEmpty()
    @IsString()
    goods_name: string;

    arrival_date: Date;

    cost_price: number;

    quantity: number;

    goods_unit: string;

    created_by: number;

    deleted_by?: number;
}
