import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { UserSelect, userSelectFields } from 'src/utils/userSelectFields';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateUserDto): Promise<UserSelect> {
    const user = await this.findByEmail(body.email);

    if (user) {
      throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
    }

    body.password = await this.hashPassword(body.password);
    return this.prisma.user.create({
      data: body,
      select: userSelectFields,
    });
  }

  async list(): Promise<UserSelect[]> {
    return await this.prisma.user.findMany({ select: userSelectFields });
  }

  async show(id: number): Promise<UserSelect | null> {
    const user = await this.validationUser(id);

    return user;
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<UserSelect> {
    if (body.password) {
      body.password = await this.hashPassword(body.password);
    }
    await this.validationUser(id);
    return this.prisma.user.update({
      where: { id: id },
      data: body,
      select: userSelectFields,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.validationUser(id);
    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  private async validationUser(id: number): Promise<UserSelect> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelectFields,
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
