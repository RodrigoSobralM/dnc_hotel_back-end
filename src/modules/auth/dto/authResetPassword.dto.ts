import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class AuthResetPasswordDto {
  @IsJWT()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
