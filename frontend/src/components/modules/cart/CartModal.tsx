"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { placeOrder } from "@/services/order/order.service";
import { toast } from "sonner";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Placing order..");
    try {
      const orderPayload = items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
      }));

      const result = await placeOrder(orderPayload);
      if (result.success) {
        toast.success("Order Placed Successfully.", { id: toastId });
        clearCart();
        onClose();
      }
    } catch (error) {
      console.error("Order failed", error);
      toast.error("Sorry! Order Again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FDFDFC] rounded-2xl! p-6 w-[95%] max-w-md shadow-xl gap-0 border-none">
        <DialogHeader className="mb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-[#13322B] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Cart
            </DialogTitle>
            <span className="text-sm text-gray-500 mr-6">
              {totalItems} Items
            </span>
          </div>
        </DialogHeader>

        <div className="flex flex-col max-h-[50vh] overflow-y-auto pr-2 -mr-2 custom-scrollbar">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 py-5 border-b border-gray-100"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-[14px] font-medium text-gray-900 leading-tight pr-4">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors focus:outline-none"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  </button>
                </div>

                <p className="text-[13px] text-gray-500 mt-1">
                  Quantity : {item.quantity}
                </p>

                <div className="flex justify-between items-end mt-3">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-3 h-3" strokeWidth={2} />
                    </button>

                    <div className="w-10 h-7 flex items-center justify-center border border-[#E5E0D8] rounded-lg text-sm font-medium text-gray-900 bg-white">
                      {item.quantity}
                    </div>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-[#13322B] flex items-center justify-center text-[#13322B] hover:bg-[#13322B]/10 transition-colors"
                    >
                      <Plus className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>

                  <span className="text-[15px] font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500 text-sm">
              <ShoppingBag className="w-12 h-12 text-gray-200 mb-3" />
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between py-5 border-t border-gray-100 mt-2">
          <span className="text-base font-bold text-gray-900">
            Total Amount :
          </span>
          <span className="text-lg font-bold text-[#13322B]">
            ${totalAmount.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 hover:cursor-pointer rounded-full border border-[#13322B] text-[#13322B] text-sm font-medium hover:bg-[#13322B]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#13322B]/20"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmOrder}
            disabled={items.length === 0 || isSubmitting}
            className="px-5 py-2.5 hover:cursor-pointer rounded-full bg-[#13322B] text-white text-sm font-medium hover:bg-[#1a453b] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#13322B] focus:ring-offset-2 flex items-center justify-center min-w-[140px]"
          >
            {isSubmitting ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
