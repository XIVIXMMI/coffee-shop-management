import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './components/role/role.module';
import { StaffModule } from './components/staff/staff.module';
import { StorageModule } from './components/storage/storage.module';
import { IngredientModule } from './components/ingredient/ingredient.module';
import { DrinksModule } from './components/drinks/drinks.module';
import { CoffeeBrewingToolsModule } from './components/coffee-brewing-tools/coffee-brewing-tools.module';
import { ShopEquipmentModule } from './components/shop-equipment/shop-equipment.module';
import { EquipmentTypeModule } from './components/equipment-type/equipment-type.module';
import { AuthModule } from './components/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { BillModule } from './components/bill/bill.module';
import { MenuModule } from './components/menu/menu.module';
import { CloudinaryModule } from './components/cloudinary/cloudinary.module';


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
  providers: [AppService],
})
export class AppModule { }
