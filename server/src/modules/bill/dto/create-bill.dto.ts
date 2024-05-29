import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty,IsNumber, IsString } from "class-validator";

export class BillDetailsDto {

    @ApiProperty({ description: 'The name of the drink', example: 'Coffee' })
    // @IsNotEmpty()
    // @IsString()
    drink_name: string;

    @ApiProperty({ description: 'The quantity of the drink', example: 2 })
    // @IsNotEmpty()
    // @IsNumber()
    quantity: number;
}

export class CreateBillDto {

    @ApiProperty({ type: [BillDetailsDto], description: 'Details of the drinks in the bill' })
    @IsArray()
    @IsNotEmpty()
    bill_details: BillDetailsDto[];
}