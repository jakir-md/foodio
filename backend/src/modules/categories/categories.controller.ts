import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { Prisma } from "../../../generated/prisma/client";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Public Route
  @Get()
  async getAllCategories() {
    return this.categoriesService.findAll();
  }

  // Admin Routes (To be protected by AuthGuard later)
  @Post()
  async createCategory(@Body() data: Prisma.CategoryCreateInput) {
    return this.categoriesService.create(data);
  }

  @Put(":id")
  async updateCategory(
    @Param("id") id: string,
    @Body() data: Prisma.CategoryUpdateInput,
  ) {
    return this.categoriesService.update(id, data);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: string) {
    return this.categoriesService.remove(id);
  }
}
