import { Hotel } from 'src/generated/prisma/client';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepository } from '../domain/repositories/Ihotel.repository';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelsRepository implements IHotelRepository {
  constructor(private readonly prisma: PrismaService) {}

  createHotel(data: CreateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.create({
      data,
    });
  }

  findAll(): Promise<Hotel[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<Hotel | null> {
    throw new Error('Method not implemented.');
  }

  updateHotel(id: number, data: CreateHotelDto): Promise<Hotel | null> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
