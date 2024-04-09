import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsString()
    goods_unit: string;

}
