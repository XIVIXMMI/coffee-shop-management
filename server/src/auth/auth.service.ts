import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) { }

    async validateUser(phone_number: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByPhoneNumber(phone_number);
        if (user) {
            return user;
        }
        return user;
    }

    async login(user: User): Promise< string> {
        const payload = { phone_number: user.phone_number, sub: user.user_id };
        const secret: string = process.env.refreshToken;
        let expiresInRefreshToken = '1h'; 
    
        return this.jwtService.signAsync(payload, {
            expiresIn: expiresInRefreshToken, 
            secret 
        });
    }
}
