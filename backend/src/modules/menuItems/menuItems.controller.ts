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
import { CreateMenuItemDto, UpdateMenuItemDto } from "./dto/menuItems.dto";

@Controller("menu-items")
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

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

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createMenuItem(@Body() data: CreateMenuItemDto) {
    return this.menuItemsService.create(data);
  }

  @Put(":id")
  async updateMenuItem(
    @Param("id") id: string,
    @Body() data: UpdateMenuItemDto,
  ) {
    return this.menuItemsService.update(id, data);
  }

  @Delete(":id")
  async deleteMenuItem(@Param("id") id: string) {
    return this.menuItemsService.remove(id);
  }
}
