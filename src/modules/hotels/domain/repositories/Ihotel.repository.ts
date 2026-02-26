import { Hotel } from 'src/generated/prisma/client';
import { CreateHotelDto } from '../dto/create-hotel.dto';

export interface IHotelRepository {
  createHotel(data: CreateHotelDto): Promise<Hotel>;
  findAll(): Promise<Hotel[]>;
  findById(id: number): Promise<Hotel | null>;
  updateHotel(id: number, data: CreateHotelDto): Promise<Hotel | null>;
  delete(id: number): Promise<void>;
}
