import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import type { IReservationRepositories } from '../domain/repositories/Ireservation.repositories';
import { REPOSITORY_TOKEN_RESERVATION } from '../utils/repositoriesTokens';
import { differenceInDays, parseISO } from 'date-fns';
import { REPOSITORY_TOKEN_HOTEL } from 'src/modules/hotels/utils/repositoriesTokens';
import type { IHotelRepositories } from 'src/modules/hotels/domain/repositories/Ihotel.repositories';
import { ReservationStatus } from 'src/generated/prisma/enums';

@Injectable()
export class CreateReservationsService {
  constructor(
    @Inject(REPOSITORY_TOKEN_RESERVATION)
    private readonly reservationsRepository: IReservationRepositories,
    @Inject(REPOSITORY_TOKEN_HOTEL)
    private readonly hotelsRespository: IHotelRepositories,
  ) {}
  async create(id: number, data: CreateReservationDto) {
    const checkInDate = parseISO(data.checkIn);
    const checkOutDate = parseISO(data.checkOut);

    if (checkInDate >= checkOutDate) {
      throw new BadRequestException(
        'Check-out date must be after check-in date.',
      );
    }

    const dayOfStay = differenceInDays(checkInDate, checkOutDate);

    const hotel = await this.hotelsRespository.findByIdHotel(data.hotelId);

    if (!hotel) {
      throw new NotFoundException('Hotel not foun.');
    }

    if (typeof hotel.price !== 'number' || hotel.price <= 0) {
      throw new BadRequestException('Invalid hotel price.');
    }

    const totalPrice = dayOfStay * hotel.price;

    const newReservation = {
      ...data,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      totalPrice,
      userId: id,
      status: ReservationStatus.PENDING,
    };

    return this.reservationsRepository.createReservations(newReservation);
  }
}
