"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IOrder } from "./orderItemsColumn";

interface OrderDetailsModalProps {
  order: IOrder;
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({
  order,
  open,
  onClose,
}: OrderDetailsModalProps) {
  if (!order) return null;
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger asChild></DialogTrigger>

        <DialogContent className="sm:max-w-112.5 p-6 bg-[#FAFAF9] gap-0">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-lg font-bold text-[#13322B] text-left">
              Order Details
            </DialogTitle>
            <p className="text-[#13322B] text-sm mt-1 text-left">
              # {order.id}
            </p>
          </DialogHeader>

          <div className="flex flex-col">
            <div>
              <p className="text-sm text-gray-700 mb-1.5">Address</p>
              <p className="text-sm text-gray-500">{order.address}</p>
            </div>

            <div className="h-px w-full bg-gray-200 my-5" />

            <div>
              <p className="text-sm text-gray-700 mb-4">Items</p>
              {order.items.map((item) => (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#13322B]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-gray-500">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-gray-200 my-5" />

            <div className="flex justify-between items-center pb-2">
              <span className="text-base font-bold text-[#13322B]">Total</span>
              <span className="text-base font-bold text-[#13322B]">
                {order.total}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
