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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Patch,
} from "@nestjs/common";
import { MenuItemsService } from "./menuItems.service";
import { Prisma, Role } from "@prisma/client";
import { AuthGuard, Roles, RolesGuard } from "../auth/auth.guards";
import { CreateMenuItemDto, UpdateMenuItemDto } from "./dto/menuItems.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "src/config/cloudinary.config";

@Controller("menu-items")
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Get()
  async getAllMenuItems(
    @Query("search") search?: string,
    @Query("categoryId") categoryId?: string,
    @Query("isAvailable") isAvailable?: string,
  ) {
    const result = await this.menuItemsService.findAll({
      search,
      categoryId,
      isAvailable,
    });
    return {
      data: result,
      success: true,
    };
  }

  @Get(":id")
  async getMenuItem(@Param("id") id: string) {
    return this.menuItemsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor("file", { storage: storage }))
  async createMenuItem(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException("Image file is required.");
    }
    const imageUrl = file.path;
    const parsedData = JSON.parse(body.data);
    const productData = {
      name: parsedData.name,
      price: parseFloat(String(parsedData.price)),
      description: parsedData.description,
      categoryId: parsedData.categoryId,
      isAvailable: String(parsedData.isAvailable) === "true",
      image: imageUrl,
    };

    const result = await this.menuItemsService.create(productData);

    return {
      success: true,
      message: "Product created successfully",
      data: result,
    };
  }

  @Patch()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor("file", { storage: storage }))
  async updateMenuItem(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const parsedData = JSON.parse(body.data);
    const imageUrl = file.path || parsedData.image;
    const productData = {
      name: parsedData.name,
      menuId: parsedData.menuId,
      price: parseFloat(String(parsedData.price)),
      description: parsedData.description,
      categoryId: parsedData.categoryId,
      isAvailable: String(parsedData.isAvailable) === "true",
      image: imageUrl,
    };
    const result = await this.menuItemsService.updateItem(productData);
    return {
      success: true,
      message: "Product created successfully",
      data: result,
    };
  }

  @Delete(":id")
  async deleteMenuItem(@Param("id") id: string) {
    return this.menuItemsService.remove(id);
  }
}
