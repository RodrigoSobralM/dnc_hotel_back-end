import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { UpdateHotelDto } from '../domain/dto/update-hotel.dto';
import { CreateHotelsService } from '../services/createHotels.service';
import { FindAllHotelsService } from '../services/findAllHotels.service';
import { FindOneHotelsService } from '../services/findOneHotels.service';
import { UpdateHotelsService } from '../services/updateHotels.service';
import { RemoveHotelsService } from '../services/removeHotels.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { FindNameHotelsService } from '../services/findNameHotels.service';
import { FindOwnerHotelsService } from '../services/findOwnerHotels.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/generated/prisma/enums';
import { OwnerHotelGuard } from 'src/shared/guards/ownerHotel.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { UploadImageHotelService } from '../services/uploadImageHotel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationInterceptor } from 'src/shared/interceptors/flieValidation.interceptor';

@UseGuards(AuthGuard, RoleGuard)
@Controller('hotels')
export class HotelsController {
  constructor(
    private readonly createHotel: CreateHotelsService,
    private readonly findAllHotel: FindAllHotelsService,
    private readonly findOneHotel: FindOneHotelsService,
    private readonly findByNameHotel: FindNameHotelsService,
    private readonly findByOwnerHotel: FindOwnerHotelsService,
    private readonly updateHotel: UpdateHotelsService,
    private readonly removeHotel: RemoveHotelsService,
    private readonly uploadImageHotel: UploadImageHotelService,
  ) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createHotelDto: CreateHotelDto, @User('id') id: number) {
    return this.createHotel.execute(createHotelDto, id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.findAllHotel.execute(Number(page), Number(limit));
  }

  @Roles(Role.ADMIN, Role.USER)
  @Roles(Role.ADMIN, Role.USER)
  @Get('name')
  findByName(@Query('name') name: string) {
    return this.findByNameHotel.execute(name);
  }

  @Roles(Role.ADMIN)
  @Get('owner')
  findOwner(@User('id') id: number) {
    return this.findByOwnerHotel.execute(id);
  }

  @Get(':id')
  findOne(@ParamId() id: number) {
    return this.findOneHotel.execute(id);
  }

  @UseInterceptors(FileInterceptor('image'), FileValidationInterceptor)
  @Patch('image/:hotelId')
  uploadImage(
    @Param('hotelId') hotelId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/¨*',
            fallbackToMimetype: true,
          }),
          new MaxFileSizeValidator({
            maxSize: 2000 * 1024,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.uploadImageHotel.execute(hotelId, image.filename);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@ParamId() id: number, @Body() updateHotelDto: UpdateHotelDto) {
    return this.updateHotel.execute(id, updateHotelDto);
  }

  @UseGuards(OwnerHotelGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@ParamId() id: number): Promise<void> {
    await this.removeHotel.execute(+id);
  }
}
