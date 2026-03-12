import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    const payload = { id: user.id, email: user.email, role: user.role };
    return { token: await this.jwtService.signAsync(payload) };
  }

  async login(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    return { token: await this.jwtService.signAsync(payload) };
  }
}