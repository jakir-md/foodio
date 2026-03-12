import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./modules/users/users.module";
import { CategoryModule } from "./modules/categories/categories.module";
import { MenuItemsModule } from "./modules/menuItems/menuItems.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CategoryModule,
    MenuItemsModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}