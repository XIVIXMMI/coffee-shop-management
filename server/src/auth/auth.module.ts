import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', 
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule, 
  ],
  providers: [AuthService, JwtService],

})
export class AuthModule {}
