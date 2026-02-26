import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserIdCheckMiddleware } from 'src/shared/middlewares/userIdCheck.middlware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdCheckMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.GET },
      );
  }
}
