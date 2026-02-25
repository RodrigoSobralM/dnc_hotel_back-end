import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Role, type User as UserType } from 'src/generated/prisma/client';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';

@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.ADMIN)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserType> {
    return this.userService.createUser(user);
  }

  @Get()
  async list(@User() user: UserType): Promise<UserType[]> {
    console.log(user);
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamId() id: number): Promise<UserType | null> {
    return this.userService.show(id);
  }

  @Patch(':id')
  async updateUser(
    @ParamId() id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserType> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@ParamId() id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
