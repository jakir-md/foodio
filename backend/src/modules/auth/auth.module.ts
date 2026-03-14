import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config"; // Import these
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_ACCESS_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
