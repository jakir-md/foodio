/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const addNewCategory = async (): Promise<any> => {
  try {
    const res = await serverFetch.post("/categories", {
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
export const deleteCategory = async (): Promise<any> => {
  try {
    const res = await serverFetch.delete("/categories", {
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
export const editCategory = async (): Promise<any> => {
  try {
    const res = await serverFetch.patch("/categories", {
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

export const getAllCategory = async (): Promise<any> => {
  try {
    const res = await serverFetch.get("/categories");
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
