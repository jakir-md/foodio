import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Prisma, Role } from "@prisma/client";
import { AuthGuard, Roles, RolesGuard } from "../auth/auth.guards";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/categories.dto";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    const result = await this.categoriesService.findAll();
    return {
      data: result,
      success: true,
    };
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createCategory(@Body() data: CreateCategoryDto) {
    const result = await this.categoriesService.create(data);
    return { data: result, success: true };
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateCategory(
    @Param("id") id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.update(id, data);
    return {
      data: result,
      success: true,
    };
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteCategory(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
