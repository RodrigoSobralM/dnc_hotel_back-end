import { Hotel } from 'src/generated/prisma/client';
import { CreateHotelDto } from '../dto/create-hotel.dto';
import { UpdateHotelDto } from '../dto/update-hotel.dto';

export interface IHotelRepository {
  createHotel(data: CreateHotelDto, id: number): Promise<Hotel>;
  findAllHotel(offset: number, limit: number): Promise<Hotel[]>;
  findByIdHotel(id: number): Promise<Hotel | null>;
  findByNameHotel(name: string): Promise<Hotel[] | null>;
  findByOwnerHotel(ownerId: number): Promise<Hotel[] | null>;
  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel | null>;
  deleteHotel(id: number): Promise<void>;
  countHotels(): Promise<number>;
}
