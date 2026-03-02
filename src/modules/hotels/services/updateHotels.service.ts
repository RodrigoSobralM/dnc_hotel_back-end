import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { Hotel } from 'src/generated/prisma/client';
import type { IHotelRepositories } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class UpdateHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepositories,
  ) {}

  async execute(id: number, body: UpdateHotelDto): Promise<Hotel | null> {
    return await this.hotelsRepository.updateHotel(id, body);
  }
}
