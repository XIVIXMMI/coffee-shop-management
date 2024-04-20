import { PartialType } from '@nestjs/mapped-types';
import { BillDetails, CreateBillDto } from './create-bill.dto';
import { IsArray, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateBillDto extends PartialType(CreateBillDto) {

    @IsNotEmpty()
    @IsNumber()
    bill_id: number;
    
    @IsNotEmpty()
    @IsDateString()
    bill_date: Date;

    @IsNotEmpty()
    @IsNumber()
    total_price: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsArray()
    @IsNotEmpty()
    bill_details: BillDetails[];
}

