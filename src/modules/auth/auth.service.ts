import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from 'src/generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthLoginDto } from './dto/authLogin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.name };
    const options: JwtSignOptions = {
      expiresIn: '1d',
      issuer: 'dnc_hotel',
      audience: 'users',
    }; // You can customize the payload as needed
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
}
