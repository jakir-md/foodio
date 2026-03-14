/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { loginUser } from "./loginUser";
import { registerSchema } from "@/zod/authentication.validation";
import { zodValidator } from "@/lib/zodvalidator";

export const registerUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (zodValidator(payload, registerSchema).success === false) {
      return { ...zodValidator(payload, registerSchema), inputs: payload };
    }

    const validatedPayload: any = zodValidator(payload, registerSchema).data;
    const registerData = {
      password: validatedPayload.password,
      name: validatedPayload.name,
      address: validatedPayload.address,
      email: validatedPayload.email,
    };

    const res = await serverFetch.post("/auth/register", {
      body: JSON.stringify(registerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Registration Failed. Please try again."}`,
    };
  }
};
