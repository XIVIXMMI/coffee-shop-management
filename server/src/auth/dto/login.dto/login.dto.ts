import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.'
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    phone_number: string;
}

