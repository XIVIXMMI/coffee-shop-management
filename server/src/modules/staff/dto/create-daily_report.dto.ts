import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber, IsNumber, IsDate, IsDateString } from 'class-validator';


export class CreateDailyReportDto {

    @IsNotEmpty()
    @IsString()
    //@ApiProperty({example: 'John Doe', description: 'Name of employee'})
    content: string;

}