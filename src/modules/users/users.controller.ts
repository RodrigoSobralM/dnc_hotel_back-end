import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from 'src/generated/prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { ParamId } from 'src/shared/decorators/paramId.decorator';

@UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  async list(): Promise<User[]> {
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamId() id: number): Promise<User | null> {
    return this.userService.show(id);
  }

  @Patch(':id')
  async updateUser(
    @ParamId() id: number,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@ParamId() id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
