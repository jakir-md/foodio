import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/orders.dto";
import { AuthGuard } from "../auth/auth.guards";

@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req, @Body() body: CreateOrderDto) {
    const userId = req.user.id;
    return this.ordersService.createOrder(userId, body.cartItems);
  }
}
