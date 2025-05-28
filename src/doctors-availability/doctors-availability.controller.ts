import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ParseToHourPipe } from 'src/common/pipes/commom-pipes/hour-validation.pipe';
import { DoctorsAvailabilityService } from './doctors-availability.service';
import { CreateDoctorsAvailabilityDTO } from './dto/create-da.dto';

@Controller('doctors-availability')
export class DoctorsAvailabilityController {
  constructor(
    private readonly doctorsAvailabilityService: DoctorsAvailabilityService,
  ) {}

  @Post()
  @UsePipes(ParseToHourPipe)
  Crete(@Body() body: CreateDoctorsAvailabilityDTO) {
    return this.doctorsAvailabilityService.Create(body);
  }
}
