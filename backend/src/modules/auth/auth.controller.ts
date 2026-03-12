import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() userData: LoginDto) {
    return this.authService.login(userData);
  }
}
