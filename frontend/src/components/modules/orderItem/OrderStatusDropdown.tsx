"use client";

import { updateOrderStatus } from "@/services/order/order.service";
import { useTransition } from "react";
import { toast } from "sonner";

interface OrderStatusDropdownProps {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusDropdown({
  orderId,
  currentStatus,
}: OrderStatusDropdownProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(async () => {
      try {
        const toastId = toast.loading("Status Updating..");
        const result = await updateOrderStatus({ orderId, newStatus });
        if (result.success) {
          toast.success("Order Status Updated.", { id: toastId });
        }
      } catch (error) {
        console.error("Failed to update status", error);
      }
    });
  };

  return (
    <div className="relative inline-block w-28">
      <select
        defaultValue={currentStatus.toLowerCase()}
        onChange={handleStatusChange}
        disabled={isPending}
        className={`w-full appearance-none bg-transparent border border-gray-200 text-gray-700 text-sm rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[#13322B] focus:border-[#13322B] cursor-pointer ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <option value="pending">Pending</option>
        <option value="preparing">Preparing</option>
        <option value="ready">Ready</option>
        <option value="completed">Completed</option>
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
  );
}
