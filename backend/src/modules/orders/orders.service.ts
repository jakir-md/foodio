import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

function formatOrderDate(date: Date): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${month} ${getOrdinalSuffix(day)}, ${year} at ${time}`;
}

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

  async findAll() {
    const orders = await this.prisma.order.findMany({
      include: {
        user: true,
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => {
      const dateObj = new Date(order.createdAt);
      const formattedDate =
        dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }) +
        ", " +
        dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      return {
        id: order.id,
        date: formattedDate,
        customerName: order.user?.name || "Unknown Customer",
        total: order.totalAmount,
        address: order.user?.address || "No address provided",
        status: order.status,

        items: order.orderItems.map((item) => ({
          quantity: item.quantity,
          price: item.price || item.menuItem?.price,
          name: item.menuItem?.name || "Unknown Item",
        })),
      };
    });
  }

  async findUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => ({
      id: order.id,
      createdAt: formatOrderDate(new Date(order.createdAt)),
      totalAmount: order.totalAmount,
      status: order.status,
      address: order.user?.address || "No address provided",
      items: order.orderItems.map((item) => ({
        id: item.menuItemId,
        name: item.menuItem?.name || "Unknown Item",
        quantity: item.quantity,
        price: Number(item.price || item.menuItem?.price || 0),
      })),
    }));
  }
}
