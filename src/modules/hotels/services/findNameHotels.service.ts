import { Inject, Injectable } from '@nestjs/common';
import { Hotel } from 'src/generated/prisma/browser';
import type { IHotelRepositories } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindNameHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepositories,
  ) {}

  async execute(name: string): Promise<Hotel[] | null> {
    return await this.hotelsRepository.findByNameHotel(name);
  }
}
