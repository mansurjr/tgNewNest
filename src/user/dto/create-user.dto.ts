import { IsString, IsEnum, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEnum(["admin", "teacher", "salesManager"])
  role: "admin" | "teacher" | "salesManager";
}
