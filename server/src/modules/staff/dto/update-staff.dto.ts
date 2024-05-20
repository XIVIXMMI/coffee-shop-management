import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateStaffDto {

    @ApiProperty({example: 'John Doe', description: 'Name of employee'})
    staff_name: string;

    @ApiProperty({example: 'Male', description: 'Gender of employee'})
    gender: string;

    @ApiProperty({example: '1990-01-01T00:00:00.000Z', description: 'Birthday of employee'})
    birthday: Date;

    @ApiProperty({example: '123 Main St, City', description: 'Address of employee'})
    address: string;

    @ApiProperty({example: '+84923456789', description: 'Phone Number of employee'})
    phone_number: string;

    @ApiProperty({example: '+john@example.com', description: 'Email Number of employee'})
    email: string;

    @ApiProperty({example: 'staff', description: 'Position of employee'})
    position: string;

    @ApiProperty({example: '30000000', description: 'Base salary of employee'})
    salary: number;

    @ApiProperty({example: '2024-01-01T00:00:00.000Z', description: 'date begin working'})
    start_date: Date;
}
