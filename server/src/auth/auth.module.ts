import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from 'src/third-parties/strategy/jwt-strategy';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, 
    JwtModule.register({
      global: true,
      secret: process.env.accessToken, 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtService, JwtModule],

})
export class AuthModule {}