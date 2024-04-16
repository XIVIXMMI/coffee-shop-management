import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/third-parties/strategy/jwt-strategy';

@Module({
  controllers: [UsersController],
  imports: [
    PrismaModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    ],
  providers: [UsersService],
  exports: [UsersService]

})
export class UsersModule {}
