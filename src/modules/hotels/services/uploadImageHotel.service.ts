import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REPOSITORY_TOKEN_HOTEL } from '../utils/repositoriesTokens';
import type { IHotelRepository } from '../domain/repositories/Ihotel.repository';
import { join, resolve } from 'path';
import { stat, unlink } from 'fs/promises';

@Injectable()
export class UploadImageHotelService {
  constructor(
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRepository: IHotelRepository,
  ) {}
  async execute(id: string, imageFileName: string) {
    const hotel = await this.hotelsRepository.findByIdHotel(Number(id));
    const directory = resolve(process.cwd(), 'uploads-hotel');

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    if (hotel.image) {
      const imageHotelFilePath = join(directory, hotel.image);
      const imageHotelExists = await stat(imageHotelFilePath);

      if (imageHotelExists) {
        await unlink(imageHotelFilePath);
      }
    }

    return await this.hotelsRepository.updateHotel(Number(id), {
      image: imageFileName,
    });
  }
}
