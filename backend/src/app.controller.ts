import { Controller, Get } from "@nestjs/common";
@Controller()
export class AppController {
  @Get()
  getHealthCheck(): string {
    return "Welcome to the Foodio API! The server is up and running smoothly.";
  }
}
