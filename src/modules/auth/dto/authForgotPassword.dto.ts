import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
