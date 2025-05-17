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
import { AntiStatementUrl } from 'src/common/pipes/anti-statements-url.pipe';
import { FindByAddressValidation } from 'src/common/pipes/urlDataValidationForSearch/address-validation.pipe';
import { FindByEmailValidation } from 'src/common/pipes/urlDataValidationForSearch/email-validation.pipe';
import { FindByIdValidation } from 'src/common/pipes/urlDataValidationForSearch/id-validation.pipe';
import { FindByNameValidation } from 'src/common/pipes/urlDataValidationForSearch/name-validation.pipe';
import { FindByPhoneNumberValidation } from 'src/common/pipes/urlDataValidationForSearch/phone-number-validation.pipe';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { PaginationDTO } from './dto/pagination-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  Create(@Body() body: CreatePatientDTO) {
    return this.patientService.Create(body);
  }

  @Patch(':id')
  Update(@Param('id') id: string, @Body() updatePatientDTO: UpdatePatientDTO) {
    return this.patientService.Update(id, updatePatientDTO);
  }

  @Get('/search/id/:id')
  @UsePipes(AntiStatementUrl, FindByIdValidation)
  FindById(@Param('id') id: string) {
    return this.patientService.FindById(id);
  }

  @Get('/search/email/:email')
  @UsePipes(AntiStatementUrl, FindByEmailValidation)
  FindByEmail(@Param('email') email: string) {
    return this.patientService.FindByEmail(email);
  }

  @Get('/search/name/')
  @UsePipes(AntiStatementUrl, FindByNameValidation)
  FindByName(@Query() paginationDTO: PaginationDTO) {
    return this.patientService.FindByName(paginationDTO);
  }

  @Get('/search/address/:address')
  @UsePipes(AntiStatementUrl, FindByAddressValidation)
  FindByAddress(@Param('address') address: string) {
    return this.patientService.FindByAddress(address);
  }

  @Get('/search/phoneNumber/:phoneNumber')
  @UsePipes(AntiStatementUrl, FindByPhoneNumberValidation)
  FindByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.patientService.FindByPhoneNumber(phoneNumber);
  }
}
