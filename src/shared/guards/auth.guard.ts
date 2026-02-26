import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userSevice: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return false;
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token);

      const user = await this.userSevice.show(decoded.sub);

      request.user = user;

      return true;
    } catch (error) {
      throw new ForbiddenException('Token inválido ou expirado');
    }
  }
}
