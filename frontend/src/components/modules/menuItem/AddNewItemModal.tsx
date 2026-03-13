"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const DUMMY_CATEGORIES = [
  { id: "1", name: "Starters" },
  { id: "2", name: "Main Courses" },
  { id: "3", name: "Desserts" },
  { id: "4", name: "Beverages" },
];

export default function AddNewItemModal() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(
    "Dish_image.png",
  );
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#13322B] text-white hover:bg-[#1a453b]">
          Add New Item
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-6 bg-[#FAFAF9]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-[#13322B]">
            Add New Item
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </Label>
              <Input
                id="name"
                className="bg-white border-gray-200 focus-visible:ring-[#13322B]"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Price
              </Label>
              <Input
                id="price"
                className="bg-white border-gray-200 focus-visible:ring-[#13322B]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </Label>
            <Select defaultValue={DUMMY_CATEGORIES[0].id}>
              <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-[#13322B]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </Label>
            <Textarea
              id="description"
              className="min-h-[100px] bg-white border-gray-200 focus-visible:ring-[#13322B] resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Image</Label>

            <div className="border border-gray-200 rounded-xl bg-white p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="w-6 h-6 text-gray-500 mb-3" />
              <p className="text-sm text-gray-700 mb-1">
                Drag or click <span className="font-semibold">here</span> to
                upload
              </p>
              <p className="text-[11px] text-gray-400">
                Size must be maximum 2mb. Supported formats : PNG & JPEG
              </p>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between p-3 mt-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-700">1. {selectedFile}</span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <Switch
                id="available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-[#13322B]"
              />
              <Label
                htmlFor="available"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Available for Order
              </Label>
            </div>

            <Button
              type="submit"
              className="bg-[#13322B] text-white hover:bg-[#1a453b] px-6 rounded-lg"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
