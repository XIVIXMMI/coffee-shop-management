import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Staff', description: 'Position of employee'})
    role_name: string;

}
