import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 3,
      },
    ]),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
