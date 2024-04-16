import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { StaffModule } from './staff/staff.module';
import { StorageModule } from './storage/storage.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { DrinksModule } from './drinks/drinks.module';
import { CoffeeBrewingToolsModule } from './coffee-brewing-tools/coffee-brewing-tools.module';
import { ShopEquipmentModule } from './shop-equipment/shop-equipment.module';
import { EquipmentTypeModule } from './equipment-type/equipment-type.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './third-parties/strategy/jwt-strategy';


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
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
