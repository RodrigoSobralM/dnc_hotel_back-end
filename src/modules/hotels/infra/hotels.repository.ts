import { Hotel } from 'src/generated/prisma/client';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { IHotelRepositories } from '../domain/repositories/Ihotel.repositories';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HotelsRepository implements IHotelRepositories {
  constructor(private readonly prisma: PrismaService) {}

  createHotel(data: CreateHotelDto, id: number): Promise<Hotel> {
    data.ownerId = id;
    return this.prisma.hotel.create({
      data,
    });
  }

  findAllHotel(offset: number, limit: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({
      take: limit,
      skip: offset,
      include: { owner: true },
    });
  }

  countHotels(): Promise<number> {
    return this.prisma.hotel.count();
  }

  findByNameHotel(name: string): Promise<Hotel[] | null> {
    return this.prisma.hotel.findMany({
      where: { name: { contains: name, mode: 'insensitive' } },
    });
  }

  findByOwnerHotel(ownerId: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({
      where: { ownerId },
    });
  }

  findByIdHotel(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({
      where: { id },
    });
  }

  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel | null> {
    return this.prisma.hotel.update({
      where: { id },
      data,
    });
  }

  deleteHotel(id: number): Promise<void> {
    return this.prisma.hotel
      .delete({
        where: { id },
      })
      .then(() => {});
  }
}
