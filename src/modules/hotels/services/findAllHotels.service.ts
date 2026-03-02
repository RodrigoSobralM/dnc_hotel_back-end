import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepositories } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepositories,
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
