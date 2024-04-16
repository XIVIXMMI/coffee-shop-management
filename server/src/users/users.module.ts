import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/third-parties/strategy/jwt-strategy';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
    secret: process.env.accessToken, 
    signOptions: { expiresIn: '1h' },
  }),],
  providers: [UsersService],
  exports: [UsersService,PassportModule, JwtModule]

})
export class UsersModule {}
