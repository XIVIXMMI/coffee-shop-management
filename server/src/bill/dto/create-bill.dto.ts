import { IsArray, IsDateString, IsNotEmpty,IsNumber, IsString, } from "class-validator";

export class CreateBillDto {

    @IsNotEmpty()   
    @IsDateString()
    bill_date: Date;

    total_price: number;

    @IsArray()
    @IsNotEmpty()
    bill_details: BillDetails[];
}

export class BillDetails {

    @IsNotEmpty()
    @IsString()
    drink_name: string;

    @IsNotEmpty()
    @IsNumber()
    bill_id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}