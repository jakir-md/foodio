import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers.authorization?.split(" ")[1];

    if (!token && request.headers.cookie) {
      const cookies = request.headers.cookie.split(";");
      const accessCookie = cookies.find((c) =>
        c.trim().startsWith("accessToken="),
      );

      if (accessCookie) {
        token = accessCookie.split("=")[1];
      }
    }

    if (!token) {
      throw new UnauthorizedException("Please log in first.");
    }

    try {
      request["user"] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token.");
    }
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        "You are not authorized to access the content.",
      );
    }

    return true;
  }
}
