import { IsDate, IsDateString, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateStaffDto {

    @IsString()
    staff_name: string;

    @IsString()
    gender: string;

    @IsDateString()
    birthday: Date;

    @IsString()
    address: string;

    @IsPhoneNumber('VN',{ message: 'Invalid phone number'})
    phone_number: string;

    @IsString()
    email: string;

    @IsString()
    position: string;

    @IsNumber()
    salary: number;

    @IsDateString()
    start_date: Date;
}
