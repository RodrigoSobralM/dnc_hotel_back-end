import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelsService } from '../services/createHotels.service';
import { FindAllHotelsService } from '../services/findAllHotels.service';
import { FindOneHotelsService } from '../services/findOneHotels.service';
import { UpdateHotelsService } from '../services/updateHotels.service';
import { RemoveHotelsService } from '../services/removeHotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotel: CreateHotelsService,
    private readonly findAllHotels: FindAllHotelsService,
    private readonly findOneHotel: FindOneHotelsService,
    private readonly updateHotel: UpdateHotelsService,
    private readonly removeHotel: RemoveHotelsService,
  ) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.createHotel.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.findAllHotels.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneHotel.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotel.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeHotel.remove(+id);
  }
}
