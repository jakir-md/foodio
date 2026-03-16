import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CategoryCreateInput) {
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingCategory) {
      throw new ConflictException(
        `A category with the name "${data.name}" already exists.`,
      );
    }

    return this.prisma.category.create({ data });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async remove(categoryId: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${categoryId} not found.`);
    }

    try {
      await this.prisma.category.delete({
        where: { id: categoryId },
      });

      return {
        success: true,
        message: "Category deleted successfully",
      };
    } catch (error: any) {
      if (error.code === "P2003") {
        throw new BadRequestException(
          "Cannot delete this category because it still has menu items attached to it.",
        );
      }
      throw error;
    }
  }
}
