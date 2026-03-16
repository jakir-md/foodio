"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ICategory } from "./categoryColumn";
import { editMenu } from "@/services/menu/menu.service";
import { toast } from "sonner";
import { editCategory } from "@/services/category/category.service";

export interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ICategory | null;
  onRefresh: () => void;
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  initialData,
  onRefresh,
}: EditCategoryModalProps) {
  const [name, setName] = useState("Pan-Seared Scallops");
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name,
      categoryId: initialData?.id,
    };
    onClose();
    try {
      const toastId = toast.loading("Updating Category..");
      const result = await editCategory(updatedData);
      if (result.success) {
        toast.success("Category Updated Successfully.", { id: toastId });
        onRefresh();
      } else
        toast.error(result.message || "Failed to update the Category.", {
          id: toastId,
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#FDFDFC] rounded-2xl! p-6 w-[95%] max-w-120 shadow-xl border-none">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold text-[#13322B]">
            Edit Category
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </Label>
              <Input
                id="edit-name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="bg-white w-full border-gray-200 focus-visible:ring-[#13322B] rounded-lg"
              />
            </div>
          </div>
          <div className="flex items-center justify-end pt-4">
            <Button
              type="submit"
              className="bg-[#13322B] hover:cursor-pointer text-white hover:bg-[#1a453b] px-6 rounded-full font-medium"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
