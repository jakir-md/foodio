"use server";
import { serverFetch } from "@/lib/server-fetch";

export const placeOrder = async (payload: any): Promise<any> => {
  try {
    const res = await serverFetch.post("/orders", {
      body: JSON.stringify({ cartItems: payload }),
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
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu retrival failed. Please try again."}`,
    };
  }
};

export const getMyOrders = async (): Promise<any> => {
  try {
    const res = await serverFetch.get("/orders/my-orders");
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

export const getAllOrders = async (): Promise<any> => {
  try {
    const res = await serverFetch.get("/orders");
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

export const updateOrderStatus = async (payload: any): Promise<any> => {
  try {
    const res = await serverFetch.post("/orders/update-status", {
      body: JSON.stringify(payload),
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
      message: `${process.env.NODE_ENV === "development" ? error.message : "Menu retrival failed. Please try again."}`,
    };
  }
};
