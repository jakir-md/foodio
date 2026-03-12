import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class MenuItemsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MenuItemCreateInput) {
    return this.prisma.menuItem.create({ data });
  }

  // Handles public searching and filtering
  async findAll(query?: {
    search?: string;
    categoryId?: string;
    isAvailable?: string;
  }) {
    const whereClause: Prisma.MenuItemWhereInput = {};

    if (query?.search) {
      whereClause.name = { contains: query.search, mode: "insensitive" };
    }

    if (query?.categoryId) {
      whereClause.categoryId = query.categoryId;
    }

    if (query?.isAvailable !== undefined) {
      // Convert string query param to boolean
      whereClause.isAvailable = query.isAvailable === "true";
    }

    return this.prisma.menuItem.findMany({
      where: whereClause,
      include: { category: true }, // Returns category details with the item
    });
  }

  async findOne(id: string) {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: string, data: Prisma.MenuItemUpdateInput) {
    return this.prisma.menuItem.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.menuItem.delete({ where: { id } });
  }
}