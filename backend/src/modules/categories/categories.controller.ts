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
    return this.categoriesService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.categoriesService.create(data);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateCategory(
    @Param("id") id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, data);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
