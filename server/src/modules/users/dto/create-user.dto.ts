import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Aa@$dmin123', description: 'Password of the user' })
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber('VN',{ message: 'Invalid phone number' })
    @ApiProperty({ example: '+84923456777', description: 'Phone number of the user in Vietnam' })
    phone_number: string;

    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID of the staff associated with the user' })
    staff_id: number;

    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID of the role assigned to the user' })
    role_id: number;
}
