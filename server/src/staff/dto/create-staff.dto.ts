import { IsString, IsNotEmpty, IsPhoneNumber, IsNumber, IsDate, IsDateString } from 'class-validator';


export class CreateStaffDto {

    @IsNotEmpty()
    @IsString()
    staff_name: string;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsDateString()
    birthday: Date;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsPhoneNumber('VN',{ message: 'Invalid phone number'})
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsNumber()
    salary: number;

    @IsNotEmpty()
    @IsDateString()
    start_date: Date;
}
