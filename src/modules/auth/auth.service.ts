import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from 'src/generated/prisma/client';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/authLogin.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { AuthRegisterDto } from './dto/authRegister.dto';
import { AuthResetPasswordDto } from './dto/authResetPassword.dto';
import { StringValue } from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async generateToken(
    user: User,
    expiresIn: StringValue = '1d',
  ): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.name };
    const options: JwtSignOptions = {
      expiresIn: expiresIn,
      issuer: 'dnc_hotel',
      audience: 'users',
    };
    return { access_token: await this.jwtService.signAsync(payload, options) };
  }

  async login({
    email,
    password,
  }: AuthLoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return await this.generateToken(user);
  }

  async register(body: AuthRegisterDto): Promise<{ access_token: string }> {
    const newUser: CreateUserDto = {
      name: body.name,
      email: body.email,
      password: body.password,
      role: body.role ?? 'USER',
    };
    const user = await this.userService.createUser(newUser);
    return await this.generateToken(user);
  }

  async resetPassword({
    token,
    password,
  }: AuthResetPasswordDto): Promise<{ access_token: string }> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);

      const user = await this.userService.updateUser(decoded.sub, {
        password,
      });

      return this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async forgotPassword(email: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const token = await this.generateToken(user, '30m');

    return token;
  }
}
