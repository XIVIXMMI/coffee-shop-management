import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class LoginDto {
    
    @IsNotEmpty()
    @IsString()
   // @IsPhoneNumber()
    @ApiProperty({example: '+84923456789', description: 'number of the user'})
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Aa@$dmin123', description: 'password of the user'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.'
    })
    password: string;

}

