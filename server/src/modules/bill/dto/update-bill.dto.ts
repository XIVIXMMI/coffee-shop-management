import { PartialType } from '@nestjs/mapped-types';
import { BillDetailsDto, CreateBillDto } from './create-bill.dto';
import { IsArray, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBillDto {
    @ApiProperty({ description: 'The ID of the bill', example: 1 })
    bill_id: number;

    @ApiProperty({ description: 'The date of the bill', example: '2024-05-10' })
    bill_date: Date;

    @ApiProperty({ description: 'The total price of the bill', example: 100000 })
    total_price: number;

    @ApiProperty({ description: 'The quantity of items in the bill', example: 3 })
    quantity: number;

    @ApiProperty({ type: [BillDetailsDto], description: 'Details of the items in the bill' })
    bill_details: BillDetailsDto[];
}

