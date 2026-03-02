import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { Hotel } from 'src/generated/prisma/client';
import type { IHotelRepositories } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class CreateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepositories,
  ) {}

  async execute(createHotelDto: CreateHotelDto, id: number): Promise<Hotel> {
    return await this.hotelsRepository.createHotel(createHotelDto, id);
  }
}
