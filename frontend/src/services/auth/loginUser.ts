/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { setCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";
import { loginSchema } from "@/zod/authentication.validation";
import { zodValidator } from "@/lib/zodvalidator";

const isProduction = process.env.NODE_ENV === "production";

export const loginUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObject: null | any = null;
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (zodValidator(payload, loginSchema).success === false) {
      return zodValidator(payload, loginSchema);
    }

    const validatedPayload = zodValidator(payload, loginSchema).data;

    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: isProduction ? "none" : "lax",
    });

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_SECRET as string,
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: UserRole = verifiedToken.role;

    if (!result.success) {
      throw new Error(result.message || "Login failed");
    }

    // if (redirectTo && result.data.needPasswordChange) {
    //   const requestedPath = redirectTo.toString();
    //   if (isValidRedirectForRole(requestedPath, userRole)) {
    //     redirect(`/reset-password?redirect=${requestedPath}`);
    //   } else {
    //     redirect("/reset-password");
    //   }
    // }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}`);
    }
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Login Failed. You might have entered incorrect email or password."}`,
    };
  }
};
