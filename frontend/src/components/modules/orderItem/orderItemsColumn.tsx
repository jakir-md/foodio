"use client";
import { Column } from "@/components/shared/MangementTable";
import OrderStatusDropdown from "./OrderStatusDropdown";

export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Completed";

export interface IOrder {
  id: string;
  date: string;
  customerName: string;
  total: number;
  address: string;
  items: {
    quantity: number;
    price: number;
    name: string;
  }[];
  status: OrderStatus;
}

export const orderItemsColumns: Column<IOrder>[] = [
  {
    header: "Order Id",
    accessor: (order) => (
      <span className="text-sm text-gray-700">{order.id}</span>
    ),
  },
  {
    header: "Date",
    accessor: (order) => (
      <span className="text-sm text-gray-700">{order.date}</span>
    ),
  },
  {
    header: "Customer",
    accessor: (order) => (
      <span className="text-sm text-gray-700">{order.customerName}</span>
    ),
  },
  {
    header: "Total",
    accessor: (order) => (
      <span className="text-sm text-gray-700">${order.total.toFixed(2)}</span>
    ),
  },
  {
    header: "Status",
    accessor: (order) => (
      <OrderStatusDropdown orderId={order.id} currentStatus={order.status} />
    ),
  },
];
