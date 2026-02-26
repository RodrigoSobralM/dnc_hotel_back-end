import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { HotelsRepository } from '../infra/hotels.repository';

@Injectable()
export class CreateHotelsService {
  constructor(private readonly hotelsRepositories: HotelsRepository) {}

  create(createHotelDto: CreateHotelDto) {
    return this.hotelsRepositories.createHotel(createHotelDto);
  }
}
