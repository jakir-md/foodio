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
    console.log({ imageUrl });

    const parsedData = JSON.parse(body.data);

    // Now extract the fields from the parsed object!
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
