import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateMenuItemDto, UpdateMenuItemDto } from "./dto/menuItems.dto";

@Injectable()
export class MenuItemsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMenuItemDto) {
    const { categoryId, ...restOfData } = data;
    console.log("categoryId from services", categoryId);
    return this.prisma.menuItem.create({
      data: {
        ...restOfData,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

  async updateItem(data: any) {
    const { menuId, categoryId, ...restOfData } = data;
    console.log("categoryId from services", categoryId);
    return this.prisma.menuItem.update({
      where: {
        id: menuId,
      },
      data: {
        ...restOfData,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

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
      whereClause.isAvailable = query.isAvailable === "true";
    }

    return this.prisma.menuItem.findMany({
      where: whereClause,
      select: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        id: true,
        isAvailable: true,
        name: true,
        description: true,
        image: true,
        price: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: string, data: UpdateMenuItemDto) {
    return this.prisma.menuItem.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.menuItem.delete({ where: { id } });
  }
}
