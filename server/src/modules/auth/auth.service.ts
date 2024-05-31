import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { ErrorCustom } from 'src/common/error.custom';
import { ERROR_RESPONSE } from 'src/common/error.handle';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(phone_number: string, password: string): Promise<any> {
        const user = await this.usersService.findByPhoneNumber(phone_number);
        if (user && user.password == password) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<string> {
        const findUser = await this.usersService.findByPhoneNumber(user.phone_number)
        if(!findUser){
            throw new ErrorCustom(ERROR_RESPONSE.UserNotExits)
        }
        const payload = {user_id: user.user_id, user_name: findUser.username
            , phone_number: user.phone_number, role_id: user.role_id, staff_id: findUser.staff_id };
        const secret: string = process.env.accessToken;
        let expiresInRefreshToken = '1d'; 
    
        const token = this.jwtService.signAsync(payload, {
            expiresIn: expiresInRefreshToken, 
            secret 
        });

        return token;
    }
}
