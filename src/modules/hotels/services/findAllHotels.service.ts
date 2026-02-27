import { Inject, Injectable } from '@nestjs/common';
import { Hotel } from 'src/generated/prisma/client';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repository';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';

@Injectable()
export class FindAllHotelsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository,
  ) {}

  execute(): Promise<Hotel[]> {
    return this.hotelsRepository.findAllHotel();
  }
}
