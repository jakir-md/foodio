import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "Category name is strictly required" })
  name: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: "Category name cannot be empty if provided" })
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
