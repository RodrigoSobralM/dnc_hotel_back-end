import { Inject, Injectable } from '@nestjs/common';
import type { IHotelRepositories } from '../domain/repositories/Ihotel.repositories';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class RemoveHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepositories,
  ) {}

  async execute(id: number): Promise<void> {
    await this.hotelsRepository.deleteHotel(id);
  }
}
