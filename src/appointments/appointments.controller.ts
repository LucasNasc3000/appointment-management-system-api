import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ParseToHourPipe } from 'src/common/pipes/commom-pipes/hour-validation.pipe';
import { FindByAppointmentStatusValidation } from 'src/common/pipes/url-data-validation-for-search/appointment-status-validation.pipe';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UsePipes(ParseToHourPipe, FindByAppointmentStatusValidation)
  Create(@Body() body: CreateAppointmentDTO) {
    return this.appointmentsService.Create(body);
  }
}
