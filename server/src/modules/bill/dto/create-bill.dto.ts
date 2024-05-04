import { IsArray, IsDateString, IsInt, IsNotEmpty,IsNumber, IsString, } from "class-validator";

export class CreateBillDto {

    @IsArray()
    @IsNotEmpty()
    bill_details: BillDetails[];

    // @IsNotEmpty()
    // @IsInt()
    // created_by: number;
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

    // @IsNotEmpty()
    // @IsNumber()
    // price: number;
}