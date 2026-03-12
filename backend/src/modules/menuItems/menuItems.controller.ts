import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { MenuItemsService } from "./menuItems.service";
import { Prisma, Role } from "@prisma/client";
import { AuthGuard, Roles, RolesGuard } from "../auth/auth.guards";

@Controller("menu-items")
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  // Public Routes
  @Get()
  async getAllMenuItems(
    @Query("search") search?: string,
    @Query("categoryId") categoryId?: string,
    @Query("isAvailable") isAvailable?: string,
  ) {
    return this.menuItemsService.findAll({ search, categoryId, isAvailable });
  }

  @Get(":id")
  async getMenuItem(@Param("id") id: string) {
    return this.menuItemsService.findOne(id);
  }

  // Admin Routes (To be protected by AuthGuard later)
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createMenuItem(@Body() data: Prisma.MenuItemCreateInput) {
    return this.menuItemsService.create(data);
  }

  @Put(":id")
  async updateMenuItem(
    @Param("id") id: string,
    @Body() data: Prisma.MenuItemUpdateInput,
  ) {
    return this.menuItemsService.update(id, data);
  }

  @Delete(":id")
  async deleteMenuItem(@Param("id") id: string) {
    return this.menuItemsService.remove(id);
  }
}
