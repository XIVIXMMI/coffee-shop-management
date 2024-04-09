import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';


export class UpdateUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsPhoneNumber('VN',{ message: 'Invalid phone number' })
    phone_number: string;

}

