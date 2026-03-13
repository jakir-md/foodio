"use client";
import { Column } from "@/components/shared/MangementTable";

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
      <div className="relative inline-block w-28">
        <select
          defaultValue={order.status}
          className="w-full appearance-none bg-transparent border border-gray-200 text-gray-700 text-sm rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[#13322B] focus:border-[#13322B] cursor-pointer"
        >
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    ),
  },
];
