import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { LoginDto, RegisterDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException("This email is already registered.");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    const payload = { id: user.id, email: user.email, role: user.role };
    return { token: await this.jwtService.signAsync(payload) };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
