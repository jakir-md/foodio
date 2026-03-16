import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { CreateMenuItemDto, UpdateMenuItemDto } from "./dto/menuItems.dto";

@Injectable()
export class MenuItemsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMenuItemDto) {
    const { categoryId, ...restOfData } = data;
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

  async findAll(query: {
    search?: string;
    categoryId?: string;
    sort?: string;
    page: number;
    limit: number;
  }) {
    const { search, categoryId, sort, page, limit } = query;
    const whereClause: any = {};

    if (search !== "undefined") {
      whereClause.name = { contains: search, mode: "insensitive" };
    }
    if (categoryId !== "undefined") {
      whereClause.categoryId = categoryId;
    }
    if (sort === "availability") {
      whereClause.isAvailable = true;
    }
    let orderByClause: any = { createdAt: "desc" };
    if (sort === "price") {
      orderByClause = { price: "desc" };
    }

    const skip = (page - 1) * limit;
    const take = limit;

    const [data, total] = await Promise.all([
      this.prisma.menuItem.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: orderByClause,
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
      }),
      this.prisma.menuItem.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
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
    try {
      await this.prisma.menuItem.delete({
        where: { id },
      });

      return {
        success: true,
        message: "Menu item deleted successfully",
      };
    } catch (error: any) {
      if (error.code === "P2003") {
        throw new BadRequestException(
          "Cannot delete this menu item because it is part of an existing order.",
        );
      }
      throw new InternalServerErrorException(
        "An unexpected error occurred while deleting the menu item.",
      );
    }
  }
}
