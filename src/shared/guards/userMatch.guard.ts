import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserMatchGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    const user = request.user;

    if (user.id !== Number(id)) {
      throw new UnauthorizedException(
        'You are not allowed to perfom this operation',
      );
    }

    return true;
  }
}
