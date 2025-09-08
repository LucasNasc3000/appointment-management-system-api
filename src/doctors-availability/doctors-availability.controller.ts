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
import { ParseToHourPipeUpdate } from 'src/common/pipes/commom-pipes/hour-validation-update.pipe';
import { ParseToHourPipe } from 'src/common/pipes/commom-pipes/hour-validation.pipe';
import { UUIDValidatorForUpdates } from 'src/common/pipes/commom-pipes/uuid-validation-updates.pipe';
import { FindByDateField } from 'src/common/pipes/url-data-validation-for-search/date-validation.pipe';
import { FindByHourField } from 'src/common/pipes/url-data-validation-for-search/hour-validation.pipe';
import { FindByIdValidationQuery } from 'src/common/pipes/url-data-validation-for-search/id-validation-query.pipe';
import { DoctorsAvailabilityService } from './doctors-availability.service';
import { CreateDoctorsAvailabilityDTO } from './dto/create-da.dto';
import { PaginationDTO } from './dto/pagination-da.dto';
import { UpdateDoctorsAvailabilityDTO } from './dto/update-da.dto';

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

  @Patch('/update/self/:id')
  @UsePipes(AntiStatementUrl, UUIDValidatorForUpdates, ParseToHourPipeUpdate)
  Update(
    @Param('id') id: string,
    @Body() updateDoctorsAvailabilityDTO: UpdateDoctorsAvailabilityDTO,
  ) {
    return this.doctorsAvailabilityService.Update(
      id,
      updateDoctorsAvailabilityDTO,
    );
  }

  @Get('/search/date/')
  @UsePipes(AntiStatementUrl, FindByDateField)
  FindByDate(@Query() paginationDTO: PaginationDTO) {
    return this.doctorsAvailabilityService.FindByDate(paginationDTO);
  }

  @Get('/search/hourFrom/')
  @UsePipes(AntiStatementUrl, FindByHourField)
  FindByHourFrom(@Query() paginationDTO: PaginationDTO) {
    return this.doctorsAvailabilityService.FindByHourFrom(paginationDTO);
  }

  @Get('/search/hourTo/')
  @UsePipes(AntiStatementUrl, FindByHourField)
  FindByHourTo(@Query() paginationDTO: PaginationDTO) {
    return this.doctorsAvailabilityService.FindByHourTo(paginationDTO);
  }

  @Get('/search/doctor/')
  @UsePipes(AntiStatementUrl, FindByIdValidationQuery)
  FindByDoctor(@Query() paginationDTO: PaginationDTO) {
    return this.doctorsAvailabilityService.FindByDoctor(paginationDTO);
  }
}
