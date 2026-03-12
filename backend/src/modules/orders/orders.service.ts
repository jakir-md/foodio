import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: string,
    cartItems: { menuItemId: string; quantity: number }[],
  ) {
    const itemIds = cartItems.map((item) => item.menuItemId);
    const dbMenuItems = await this.prisma.menuItem.findMany({
      where: { id: { in: itemIds } },
    });

    let totalAmount = 0;

    const orderItemsData = cartItems.map((cartItem) => {
      const dbItem = dbMenuItems.find(
        (item) => item.id === cartItem.menuItemId,
      );

      if (!dbItem) throw new BadRequestException("Menu item not found.");
      if (!dbItem.isAvailable)
        throw new BadRequestException(
          `${dbItem.name} is currently out of stock.`,
        );

      totalAmount += dbItem.price * cartItem.quantity;

      return {
        menuItemId: dbItem.id,
        quantity: cartItem.quantity,
        price: dbItem.price,
      };
    });

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          orderItems: {
            create: orderItemsData,
          },
        },
        include: { orderItems: true },
      });

      return order;
    });
  }
}
