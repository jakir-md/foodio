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

export const getAllMenu = async (page = "1", limit = "10"): Promise<any> => {
  try {
    const res = await serverFetch.get(
      `/menu-items?page=${page}&limit=${limit}`,
    );
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

interface IQueryInfo {
  search: string | undefined;
  sort: string | undefined;
  page: string;
  limit: string;
  categoryId: string | undefined;
}

export const getAllMenuForUser = async ({
  search,
  sort,
  page,
  limit,
  categoryId,
}: IQueryInfo): Promise<any> => {
  try {
    const res = await serverFetch.get(
      `/menu-items?page=${page}&limit=${limit}&categoryId=${categoryId}&sort=${sort}&search=${search}`,
    );
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

export const deleteMenu = async (menuId: string): Promise<any> => {
  try {
    const res = await serverFetch.delete(`/menu-items/${menuId}`);
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

export const editMenu = async (
  payload: any,
  file?: File | null,
): Promise<any> => {
  const newFormData = new FormData();
  newFormData.append("data", JSON.stringify(payload));
  if (file) {
    newFormData.append("file", file);
  }

  try {
    const res = await serverFetch.patch("/menu-items", {
      body: newFormData,
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
