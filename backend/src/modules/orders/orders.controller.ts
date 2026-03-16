import { Controller, Post, Body, Req, UseGuards, Get } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/orders.dto";
import { AuthGuard, Roles, RolesGuard } from "../auth/auth.guards";
import { OrderStatus, Role } from "@prisma/client";

@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req, @Body() body: CreateOrderDto) {
    const userId = req.user.id;
    this.ordersService.createOrder(userId, body.cartItems);
    return {
      success: true,
    };
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllOrders() {
    const result = await this.ordersService.findAll();
    return {
      data: result,
      success: true,
    };
  }

  @Get("my-orders")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  async getMyOrders(@Req() req) {
    const userId = req.user.id;
    const orders = await this.ordersService.findUserOrders(userId);
    return {
      success: true,
      data: orders,
    };
  }

  @Post("update-status")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateOrderStatus(
    @Body() body: { orderId: string; newStatus: OrderStatus },
  ) {
    const { orderId, newStatus } = body;
    const updatedOrder = await this.ordersService.updateStatus(
      orderId,
      newStatus,
    );
    return {
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    };
  }
}
