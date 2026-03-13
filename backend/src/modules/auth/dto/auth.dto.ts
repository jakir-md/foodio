import { IsEmail, IsString, MinLength, IsNotEmpty } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: "Full Name is required" })
  @MinLength(2, { message: "Name must be at least 2 characters" })
  name: string;

  @IsEmail({}, { message: "Invalid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Address is required" })
  @MinLength(5, { message: "Please provide a complete address" })
  address: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
