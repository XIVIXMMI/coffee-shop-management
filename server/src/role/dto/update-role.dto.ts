
import { IsString } from 'class-validator';

export class UpdateRoleDto  {

    @IsString()
    role_name: string;
}
