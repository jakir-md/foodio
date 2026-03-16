"use client";
import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface QuantityDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  quantity: number;
  setQuantity: (prev: number) => void;
  onAddToCart: () => void;
}

export default function AddToCartDialog({
  isOpen,
  onOpenChange,
  productName = "Golden Crunch Bites",
  onAddToCart,
  quantity,
  setQuantity,
}: QuantityDialogProps) {
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const handleAdd = () => {
    onAddToCart();
    toast.success("Item Added to Cart.")
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) setQuantity(1);
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#FDFDFC] rounded-2xl! p-6 w-[95%] max-w-110 shadow-xl gap-0 border-none">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold text-[#13322B] text-left">
            Select the quantity
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-gray-500">Items</span>
            <span className="text-base font-medium text-gray-900">
              {productName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <Minus className="w-4 h-4" strokeWidth={2} />
            </button>

            <div className="w-14 h-10 flex items-center justify-center border border-[#E5E0D8] rounded-xl text-xl font-medium text-gray-900 bg-white">
              {quantity}
            </div>

            <button
              onClick={handleIncrement}
              className="w-8 h-8 rounded-full border border-[#13322B] flex items-center justify-center text-[#13322B] hover:bg-[#13322B]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#13322B]/20"
            >
              <Plus className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-3 sm:gap-3">
          <DialogClose asChild>
            <button className="px-6 py-2.5 rounded-full border border-[#13322B] text-[#13322B] font-medium hover:bg-[#13322B]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#13322B]/20">
              Cancel
            </button>
          </DialogClose>
          <button
            onClick={handleAdd}
            className="px-6 py-2.5 hover:cursor-pointer rounded-full bg-[#13322B] text-white font-medium hover:bg-[#1a453b] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#13322B] focus:ring-offset-2"
          >
            Add to cart
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
