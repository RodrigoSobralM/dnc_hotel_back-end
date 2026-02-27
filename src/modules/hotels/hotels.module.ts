import { Module } from '@nestjs/common';
import { CreateHotelsService } from './services/createHotels.service';
import { FindAllHotelsService } from './services/findAllHotels.service';
import { FindOneHotelsService } from './services/findOneHotels.service';
import { UpdateHotelsService } from './services/updateHotels.service';
import { RemoveHotelsService } from './services/removeHotels.service';
import { HotelsRepository } from './infra/hotels.repository';
import { HotelsController } from './infra/hotels.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FindOwnerHotelsService } from './services/findOwnerHotels.service';
import { FindNameHotelsService } from './services/findNameHotels.service';
import { REPOSITORY_TOKEN_HOTEL } from './utils/repositoriesTokens';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindAllHotelsService,
    FindOneHotelsService,
    FindNameHotelsService,
    FindOwnerHotelsService,
    UpdateHotelsService,
    RemoveHotelsService,
    FindNameHotelsService,
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepository,
    },
  ],
})
export class HotelsModule {}
