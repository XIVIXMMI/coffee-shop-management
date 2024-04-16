import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsPhoneNumber('VN',{ message: 'Invalid phone number' })
    phone_number: string;

    @IsNotEmpty()
    staff_id: number;

    @IsNotEmpty()
    role_id: number;
}
