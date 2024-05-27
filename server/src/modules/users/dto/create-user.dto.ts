import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber,Matches } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Aa@$dmin123', description: 'Password of the user' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.'
    })
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
