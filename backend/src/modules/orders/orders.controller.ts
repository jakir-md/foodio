import { Controller, Post, Body, Req, UseGuards, Get } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/orders.dto";
import { AuthGuard, Roles, RolesGuard } from "../auth/auth.guards";
import { Role } from "@prisma/client";

@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req, @Body() body: CreateOrderDto) {
    const userId = req.user.id;
    console.log({ carts: body.cartItems });
    this.ordersService.createOrder(userId, body.cartItems);
    return {
      success: true,
    };
  }

  @Get()
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
}
