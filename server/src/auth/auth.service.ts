import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

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
        const payload = {user_id: user.user_id, phone_number: user.phone_number, role_id: user.role_id };
        const secret: string = process.env.accessToken;
        let expiresInRefreshToken = '1h'; 
    
        const token = this.jwtService.signAsync(payload, {
            expiresIn: expiresInRefreshToken, 
            secret 
        });

        return token;
    }
}
