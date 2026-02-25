import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.name };
    const options: JwtSignOptions = {
      expiresIn: '1d',
      issuer: 'dnc_hotel',
      audience: 'users',
    }; // You can customize the payload as needed
    return { access_token: await this.jwtService.signAsync(payload, options) };
  }
}
