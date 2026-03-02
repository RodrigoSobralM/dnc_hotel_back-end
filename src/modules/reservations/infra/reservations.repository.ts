import { Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/Ireservation.repositories';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Reservation } from 'src/generated/prisma/client';

@Injectable()
export class ReservationsRepository implements IReservationRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  createReservations(data: any): Promise<Reservation> {
    return this.prismaService.reservation.create({ data });
  }
}
