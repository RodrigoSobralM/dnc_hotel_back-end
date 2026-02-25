import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/generated/prisma/enums';
import { CreateUserDto } from 'src/modules/users/dto/createUser.dto';

export class AuthRegisterDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsEnum(Role)
  role?: Role;
}
