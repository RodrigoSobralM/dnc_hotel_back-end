import { Inject, Injectable } from '@nestjs/common';
import { Hotel } from 'src/generated/prisma/client';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repository';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindOneHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository,
  ) {}

  async execute(id: number): Promise<Hotel | null> {
    return await this.hotelsRepository.findByIdHotel(id);
  }
}
