import { IsDateString, IsNumber, IsString } from "class-validator";

export class UpdateStorageDto {
    @IsString()
    goods_name: string;
    
    @IsDateString()
    arrival_date: Date;

    @IsNumber()
    cost_price: number;

    @IsNumber()
    quantity: number;

    @IsString()
    goods_unit: string;
}
