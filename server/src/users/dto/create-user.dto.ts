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
}
