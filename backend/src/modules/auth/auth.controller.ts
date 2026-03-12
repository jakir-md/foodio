import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Prisma } from "@prisma/client";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() userData: Prisma.UserCreateInput) {
    return this.authService.register(userData);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() userData: Prisma.UserCreateInput) {
    return this.authService.login(userData);
  }
}
