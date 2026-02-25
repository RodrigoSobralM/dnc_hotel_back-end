import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/generated/prisma/client';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateUserDto): Promise<User> {
    body.password = await this.hashPassword(body.password);
    return this.prisma.user.create({ data: body });
  }

  async list(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async show(id: number): Promise<User | null> {
    const user = await this.validationUser(id);

    return user;
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }
    await this.validationUser(id);
    return this.prisma.user.update({ where: { id: id }, data: body });
  }

  async deleteUser(id: number): Promise<void> {
    await this.validationUser(id);
    await this.prisma.user.delete({ where: { id } });
  }

  private async validationUser(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
