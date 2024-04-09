import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { StaffModule } from './staff/staff.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [UsersModule, PrismaModule, RoleModule, StaffModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
