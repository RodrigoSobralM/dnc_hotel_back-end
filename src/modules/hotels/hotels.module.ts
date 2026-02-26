import { Module } from '@nestjs/common';
import { CreateHotelsService } from './services/createHotels.service';
import { FindAllHotelsService } from './services/findAllHotels.service';
import { FindOneHotelsService } from './services/findOneHotels.service';
import { UpdateHotelsService } from './services/updateHotels.service';
import { RemoveHotelsService } from './services/removeHotels.service';
import { HotelsRepository } from './infra/hotels.repository';
import { HotelsController } from './infra/hotels.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HotelsController],
  providers: [
    CreateHotelsService,
    FindAllHotelsService,
    FindOneHotelsService,
    UpdateHotelsService,
    RemoveHotelsService,
    HotelsRepository,
  ],
})
export class HotelsModule {}
