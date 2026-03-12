import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./modules/users/user.module";
import { CategoryModule } from "./modules/categories/categories.module";
import { MenuItemsModule } from "./modules/menuItems/menuItems.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
    CategoryModule,
    MenuItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}