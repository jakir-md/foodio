"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";

export interface UserInfo {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
}

export const getUserInfo = async (): Promise<UserInfo | any> => {
  let userInfo: UserInfo | any;
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const verifiedToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    userInfo = {
      email: verifiedToken.email,
      role: verifiedToken.role,
    };
    return userInfo;
  } catch (error: any) {
    console.log(error);
    return {
      id: "",
      name: "Unknown User",
      email: "",
      role: "USER",
    };
  }
};
