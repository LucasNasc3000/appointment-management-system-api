import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AntiStatementUrl } from 'src/common/pipes/commom-pipes/anti-statements-url.pipe';
import { ParseToDatePipeUpdate } from 'src/common/pipes/commom-pipes/date-validation-update.pipe';
import { ParseToDatePipe } from 'src/common/pipes/commom-pipes/date-validation.pipe';
import { ParseToHourPipeUpdate } from 'src/common/pipes/commom-pipes/hour-validation-update.pipe';
import { ParseToHourPipe } from 'src/common/pipes/commom-pipes/hour-validation.pipe';
import { UUIDValidatorForUpdates } from 'src/common/pipes/commom-pipes/uuid-validation-updates.pipe';
import { FindByDateField } from 'src/common/pipes/url-data-validation-for-search/date-validation.pipe';
import { FindByHourField } from 'src/common/pipes/url-data-validation-for-search/hour-validation.pipe';
import { FindByIdValidationQuery } from 'src/common/pipes/url-data-validation-for-search/id-validation-query.pipe';
import { FindByIdValidation } from 'src/common/pipes/url-data-validation-for-search/id-validation.pipe';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { PaginationDTO } from './dto/pagination-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UsePipes(ParseToHourPipe, ParseToDatePipe)
  Create(@Body() body: CreateAppointmentDTO) {
    return this.appointmentsService.Create(body);
  }

  @Patch(':id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    ParseToHourPipeUpdate,
    ParseToDatePipeUpdate,
  )
  Update(
    @Param('id') id: string,
    @Body() updateAppointmentDTO: UpdateAppointmentDTO,
  ) {
    return this.appointmentsService.Update(id, updateAppointmentDTO);
  }

  @Get('/search/id/:id')
  @UsePipes(AntiStatementUrl, FindByIdValidation)
  FindById(@Param('id') id: string) {
    return this.appointmentsService.FindById(id);
  }

  @Get('/search/date/')
  @UsePipes(AntiStatementUrl, FindByDateField)
  FindByDate(@Query() paginationDTO: PaginationDTO) {
    return this.appointmentsService.FindByDate(paginationDTO);
  }

  @Get('/search/hour/')
  @UsePipes(AntiStatementUrl, FindByHourField)
  FindByHour(@Query() paginationDTO: PaginationDTO) {
    return this.appointmentsService.FindByHour(paginationDTO);
  }

  @Get('/search/format/')
  @UsePipes(AntiStatementUrl)
  FindByFormat(@Query() paginationDTO: PaginationDTO) {
    return this.appointmentsService.FindByFormat(paginationDTO);
  }

  @Get('/search/status/')
  @UsePipes(AntiStatementUrl)
  FindByStatus(@Query() paginationDTO: PaginationDTO) {
    return this.appointmentsService.FindByStatus(paginationDTO);
  }

  @Get('/search/patient/')
  @UsePipes(AntiStatementUrl, FindByIdValidationQuery)
  FindByPatient(@Query() paginationDTO: PaginationDTO) {
    return this.appointmentsService.FindByPatient(paginationDTO);
  }

  @Get('/search/doctor/')
  @UsePipes(AntiStatementUrl, FindByIdValidationQuery)
  FindByDoctor(@Query() paginationDTO: PaginationDTO) {
    return this.appointmentsService.FindByDoctor(paginationDTO);
  }
}
