"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ICategory } from "./categoryColumn";
import { IMenuItem } from "./menuItemsColumn";
import { editMenu } from "@/services/menu/menu.service";
import { toast } from "sonner";

export interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategory[];
  initialData?: IMenuItem | null;
  onRefresh: () => void;
}

export default function EditMenuItemModal({
  isOpen,
  onClose,
  initialData,
  categories,
  onRefresh,
}: EditItemModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState("Pan-Seared Scallops");
  const [price, setPrice] = useState(24);
  const [category, setCategory] = useState("starters");
  const [description, setDescription] = useState(
    "Jumbo scallops with cauliflower purée and truffle oil.",
  );
  const [fileName, setFileName] = useState<string | null>("Dish_image.png");
  const [isAvailable, setIsAvailable] = useState(true);
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setCategory(initialData.category.id);
      setDescription(initialData.description);
      setIsAvailable(initialData.isAvailable);
      setFileName(initialData.image || "Dish_image.png");
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      name,
      menuId: initialData?.id,
      price: parseFloat(price.toString()),
      categoryId: category,
      description,
      isAvailable,
      image: initialData?.image,
    };
    onClose();
    try {
      const toastId = toast.loading("Updating Item..");
      const result = await editMenu(updatedData, selectedFile);
      if (result.success) {
        toast.success("Item Updated Successfully.", { id: toastId });
        onRefresh();
      } else
        toast.error(result.message || "Failed to delete the menu item.", {
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
            Edit Item
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
                className="bg-white border-gray-200 focus-visible:ring-[#13322B] rounded-lg"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-price"
                className="text-sm font-medium text-gray-700"
              >
                Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <Input
                  id="edit-price"
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="bg-white border-gray-200 focus-visible:ring-[#13322B] rounded-lg pl-6"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-category"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </Label>
            <Select value={category} required onValueChange={setCategory}>
              <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-[#13322B] rounded-lg">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="edit-description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Input
              id="edit-description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white border-gray-200 focus-visible:ring-[#13322B] rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Image</Label>
            {fileName ? (
              <div className="flex items-center justify-between p-2.5 bg-white border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-700 line-clamp-1 truncate">
                  1. {fileName.slice(0, 30)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFileName(null);
                    setSelectedFile(null);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors text-sm text-gray-500 w-full"
              >
                Click to upload a new image
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  required
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFileName(file.name);
                      setSelectedFile(file);
                    }
                  }}
                />
              </label>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <Switch
                id="edit-available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-[#13322B]"
              />
              <Label
                htmlFor="edit-available"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Available for Order
              </Label>
            </div>

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
