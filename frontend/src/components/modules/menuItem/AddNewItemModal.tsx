"use client";

import { Upload, X } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { Field, FieldLabel } from "@/components/ui/field";
import InputFieldError from "@/components/shared/InputFieldError";
import { addNewMenu } from "@/services/menu/menu.service";
import { ICategory } from "./categoryColumn";

interface INewItemModalProps {
  open: boolean;
  onClose: () => void;
  categories: ICategory[];
  onSuccess: () => void;
}

export default function AddNewItemModal({
  open,
  onClose,
  categories,
  onSuccess,
}: INewItemModalProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(
    "Dish_image.png",
  );
  const [state, formAction, isPending] = useActionState(addNewMenu, {
    message: null,
    inputs: {},
    errors: [],
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      onClose();
      onSuccess();
    }
  }, [state]);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const removeFile = () => {
    setSelectedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="sm:max-w-125  max-h-[90vh] flex flex-col p-6 bg-[#FAFAF9]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-[#13322B]">
            Add New Item
          </DialogTitle>
        </DialogHeader>

        <form
          action={formAction}
          className="overflow-y-auto overflow-none  custom-scrollbar space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <Field className="space-y-1.5">
              <FieldLabel
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Enter Name"
                defaultValue={state?.inputs?.name}
                className="bg-white border-gray-200 focus-visible:ring-[#13322B]"
              />
              <InputFieldError field="name" state={state} />
            </Field>

            <Field className="space-y-1.5">
              <FieldLabel
                htmlFor="price"
                className="text-sm font-medium text-gray-700"
              >
                Price
              </FieldLabel>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter Price"
                defaultValue={state?.inputs?.price}
                className="bg-white border-gray-200 focus-visible:ring-[#13322B]"
              />
              <InputFieldError field="price" state={state} />
            </Field>
          </div>

          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="category"
              className="text-sm font-medium text-gray-700"
            >
              Category
            </FieldLabel>
            <Select
              name="categoryId"
              defaultValue={state?.inputs?.category || categories[0].id}
            >
              <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-[#13322B]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputFieldError field="category" state={state} />
          </Field>

          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </FieldLabel>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter Placeholder"
              defaultValue={state?.inputs?.description}
              className="min-h-25 bg-white border-gray-200 focus-visible:ring-[#13322B] resize-none"
            />
            <InputFieldError field="description" state={state} />
          </Field>

          <Field className="space-y-1.5">
            <FieldLabel className="text-sm font-medium text-gray-700">
              Image
            </FieldLabel>

            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <div
              onClick={triggerFileInput}
              className="border border-gray-200 rounded-xl bg-white p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-6 h-6 text-gray-500 mb-3" />
              <p className="text-sm text-gray-700 mb-1">
                Drag or click <span className="font-semibold">here</span> to
                upload
              </p>
              <p className="text-[11px] text-gray-400">
                Size must be maximum 2mb. Supported formats: PNG & JPEG
              </p>
            </div>

            {selectedFileName && (
              <div className="flex items-center justify-between p-3 mt-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-700 line-clamp-1 truncate mr-4">
                  1. {selectedFileName}
                </span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <InputFieldError field="image" state={state} />
          </Field>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center justify-between gap-3">
              <Switch
                id="available"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                className="data-[state=checked]:bg-[#13322B]"
              />
              <input
                type="hidden"
                name="isAvailable"
                value={isAvailable.toString()}
              />
              <FieldLabel
                htmlFor="available"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Available for Order
              </FieldLabel>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#13322B] text-white hover:bg-[#1a453b] px-6 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* General Form Error Message */}
          {state?.message && !state?.success && (
            <p className="text-red-500 text-sm mt-2">{state.message}</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
