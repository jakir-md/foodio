import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  Min,
} from "class-validator";

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty({ message: "Menu item name is required" })
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0, { message: "Price cannot be negative" })
  price: number;

  @IsString()
  @IsNotEmpty({ message: "Category ID is required" })
  categoryId: string;

  @IsString()
  image: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

export class UpdateMenuItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
