import { Module } from "@nestjs/common";
import { MenuItemsController } from "./menuItems.controller";
import { MenuItemsService } from "./menuItems.service";

@Module({
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
  exports: [MenuItemsService],
})
export class MenuItemsModule {}
