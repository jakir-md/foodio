"use client";
import { LogIn, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FDFDFC] rounded-2xl! p-6 sm:max-w-md border-none shadow-xl">
        <DialogHeader className="mb-4 text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-[#13322B]/10 rounded-full flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-[#13322B]" />
          </div>
          <DialogTitle className="text-xl font-bold text-[#13322B]">
            Login Required
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            You need to be logged in to add items to your cart and place an
            order. Please log in or create an account to continue.
            <div className="mt-5 flex items-center justify-around">
              <Link
                href={"/login"}
                className="w-full sm:w-1/2 py-2 px-1 rounded-full flex items-center justify-center border-gray-200 text-gray-700 bg-gray-100"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Login
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sr-only flex-col sm:flex-row gap-3 sm:gap-0 mt-4"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
