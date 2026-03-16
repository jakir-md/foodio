/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export const addNewCategory = async (name: string): Promise<any> => {
  try {
    const res = await serverFetch.post("/categories", {
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    if (res.ok || result.success) {
      revalidateTag("categories", { expire: 0 });
    }
    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    const errorMessage =
      error?.response?.message ||
      error?.message ||
      "Failed to create category. Please try again.";

    // 2. Return the clean object for your frontend to display
    return {
      success: false,
      data: [],
      message: errorMessage,
    };
  }
};

export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const res = await serverFetch.delete(`/categories/${categoryId}`);
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
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu addition failed. Please try again."}`,
    };
  }
};

export const editCategory = async (payload: any): Promise<any> => {
  try {
    const res = await serverFetch.patch(`/categories/${payload.categoryId}`, {
      body: JSON.stringify({ name: payload.name }),
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
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu addition failed. Please try again."}`,
    };
  }
};

export const getAllCategories = async (): Promise<any> => {
  try {
    const res = await serverFetch.get("/categories", {
      next: { tags: ["categories"] },
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
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu retrival failed. Please try again."}`,
    };
  }
};
