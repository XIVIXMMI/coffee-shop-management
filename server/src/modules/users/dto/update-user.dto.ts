import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';


export class UpdateUserDto {

    @ApiProperty({ example: 'john_doe', description: 'Username of the user' })
    username: string;

    @ApiProperty({ example: 'Aa@$dmin123', description: 'Password of the user' })
    password: string;

    @ApiProperty({ example: '+84923456777', description: 'Phone number of the user in Vietnam' })
    phone_number: string;

}