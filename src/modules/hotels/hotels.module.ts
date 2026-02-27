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
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { UploadImageHotelService } from './services/uploadImageHotel.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads-hotel',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
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
    UploadImageHotelService,
    {
      provide: REPOSITORY_TOKEN_HOTEL,
      useClass: HotelsRepository,
    },
  ],
})
export class HotelsModule {}
