import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from 'src/third-parties/strategy/jwt-strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule, 
    JwtModule.register({
      global: true,
      secret: process.env.accessToken, 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]

})
export class AuthModule {}
