"use client";
import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addNewCategory } from "@/services/category/category.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface INewCategoryModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
  categoryName: string;
  setCategoryName: (val: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}
export default function AddNewCategoryModal({
  open,
  onClose,
  onSubmit,
  categoryName,
  setCategoryName,
}: INewCategoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="sm:max-w-106.25 p-6 bg-[#FAFAF9]">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-[#13322B]">
            Add Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="bg-white border-gray-200 focus-visible:ring-[#13322B] rounded-md h-10"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              className="bg-[#13322B] text-white hover:bg-[#1a453b] px-8 rounded-full"
            >
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
