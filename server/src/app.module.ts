import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './modules/role/role.module';
import { StaffModule } from './modules/staff/staff.module';
import { StorageModule } from './modules/storage/storage.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { DrinksModule } from './modules/drinks/drinks.module';
import { CoffeeBrewingToolsModule } from './modules/coffee-brewing-tools/coffee-brewing-tools.module';
import { ShopEquipmentModule } from './modules/shop-equipment/shop-equipment.module';
import { EquipmentTypeModule } from './modules/equipment-type/equipment-type.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { BillModule } from './modules/bill/bill.module';
import { MenuModule } from './modules/menu/menu.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FormDataInterceptor } from './third-parties/interceptors/transform.interceptor';


@Module({
  imports: [UsersModule,
    PrismaModule,
    RoleModule,
    StaffModule,
    StorageModule,
    IngredientModule,
    DrinksModule,
    CoffeeBrewingToolsModule,
    ShopEquipmentModule,
    EquipmentTypeModule,
    AuthModule,
    PassportModule,
    BillModule,
    MenuModule,
    CloudinaryModule
    ],
  controllers: [AppController],
  providers: [AppService
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: FormDataInterceptor,
    // },
  ],
})
export class AppModule { }
