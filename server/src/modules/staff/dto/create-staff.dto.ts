import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber, IsNumber, IsDate, IsDateString } from 'class-validator';


export class CreateStaffDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'John Doe', description: 'Name of employee'})
    staff_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Male', description: 'Gender of employee'})
    gender: string;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({example: '1990-01-01 00:00:00', description: 'Birthday of employee'})
    birthday: Date;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '123 Main St, City', description: 'Address of employee'})
    address: string;

    @IsNotEmpty()
    @IsPhoneNumber('VN',{ message: 'Invalid phone number'})
    @ApiProperty({example: '+84923456789', description: 'Phone Number of employee'})
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: '+john@example.com', description: 'Email Number of employee'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Staff', description: 'Position Number of employee'})
    position: string;

    @IsNotEmpty()
    @ApiProperty({example: '30000000', description: 'Base salary of employee'})
    salary: number;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({example: '2024-01-01 00:00:00', description: 'date begin working'})
    start_date: Date;
}
