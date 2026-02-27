import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repository';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import { Hotel } from 'src/generated/prisma/client';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository,
  ) {}

  async execute(page: number = 1, limit: number = 10) {
    const offSet = (page - 1) * limit;
    const data = await this.hotelsRepository.findAllHotel(offSet, limit);
    const totalHotels = await this.hotelsRepository.countHotels();

    return {
      total: totalHotels,
      page,
      per_page: limit,
      data,
    };
  }
}
