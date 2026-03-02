import { Module } from '@nestjs/common';
import { CreateReservationsService } from './service/createReservations.service';
import { ReservationsController } from './infra/reservations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { HotelsModule } from '../hotels/hotels.module';
import { REPOSITORY_TOKEN_HOTEL } from '../hotels/utils/repositoriesTokens';
import { REPOSITORY_TOKEN_RESERVATION } from './utils/repositoriesTokens';
import { ReservationsRepository } from './infra/reservations.repository';
import { HotelsRepository } from '../hotels/infra/hotels.repository';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, HotelsModule],
  controllers: [ReservationsController],
  providers: [
    CreateReservationsService,
    { provide: REPOSITORY_TOKEN_RESERVATION, useClass: ReservationsRepository },
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepository,
    },
  ],
})
export class ReservationsModule {}
