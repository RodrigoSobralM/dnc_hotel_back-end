import { Inject, Injectable } from '@nestjs/common';
import { Hotel } from 'src/generated/prisma/client';
import type { IHotelRepositories } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindOneHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepositories,
  ) {}

  async execute(id: number): Promise<Hotel | null> {
    return await this.hotelsRepository.findByIdHotel(id);
  }
}
