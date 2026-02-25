import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authLogin.dto';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { AuthResetPasswordDto } from './dto/authResetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: AuthLoginDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @Post('register')
  async register(
    @Body() body: AuthRegisterDto,
  ): Promise<{ access_token: string }> {
    return this.authService.register(body);
  }

  @Patch('reset-password')
  async resetPassword(
    @Body() { token, password }: AuthResetPasswordDto,
  ): Promise<{ access_token: string }> {
    return this.authService.resetPassword({ token, password });
  }
}
