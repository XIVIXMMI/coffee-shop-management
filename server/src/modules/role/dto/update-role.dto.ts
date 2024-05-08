
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateRoleDto  {

    @IsString()
    @ApiProperty({example: 'Staff', description: 'Position of employee'})
    role_name: string;
}
