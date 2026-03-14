/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodvalidator";
import { createMenuItemSchema } from "@/zod/menuItem.validation";

export const addNewMenu = async (
  _prevState: any,
  formData: FormData,
): Promise<any> => {
  const rawData = Object.fromEntries(formData.entries());
  try {
    if (zodValidator(rawData, createMenuItemSchema).success === false) {
      return {
        ...zodValidator(rawData, createMenuItemSchema),
        inputs: rawData,
      };
    }

    const { image, ...restData } = rawData;
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(restData));
    if (formData.get("image")) {
      newFormData.append("file", formData.get("image") as Blob);
    }

    const res = await serverFetch.post("/menu-items", {
      body: newFormData,
    });

    const result = await res.json();
    console.log("result from menu item", result);
    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      data: [],
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu addition failed. Please try again."}`,
    };
  }
};

export const getAllMenu = async (): Promise<any> => {
  try {
    const res = await serverFetch.get("/menu-items");
    const result = await res.json();
    console.log({ result });
    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      data: [],
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu retrival failed. Please try again."}`,
    };
  }
};

export const deleteMenu = async (): Promise<any> => {
  try {
    const res = await serverFetch.delete("/menu", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      data: [],
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu deletion failed. Please try again."}`,
    };
  }
};

export const editMenu = async (): Promise<any> => {
  try {
    const res = await serverFetch.patch("/menu", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      data: [],
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu Edit failed. Please try again."}`,
    };
  }
};
