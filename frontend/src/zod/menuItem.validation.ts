import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createMenuItemSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long.")
    .max(100, "Name cannot exceed 100 characters."),
  price: z
    .string()
    .min(1, "Price is required.")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), "Price must be a valid number.")
    .refine((val) => val > 0, "Price must be greater than 0."),

  categoryId: z.string().min(1, "Please select a category."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(1000, "Description cannot exceed 1000 characters."),

  isAvailable: z.coerce.boolean(),

  image: z
    .any()
    .refine((file) => file?.size > 0, "An image is required.")
    .refine(
      (file) => file?.size <= MAX_FILE_SIZE,
      "Image size must be less than 2MB.",
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, and .png formats are supported.",
    ),
});