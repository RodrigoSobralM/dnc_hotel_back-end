import { Reservation } from 'src/generated/prisma/client';
import { CreateReservationDto } from '../dto/create-reservation.dto';

export interface IReservationRepositories {
  createReservations(data: CreateReservationDto): Promise<Reservation>;
}
