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
import { UUIDValidatorForUpdates } from 'src/common/pipes/commom-pipes/uuid-validation-updates.pipe';
import { PatientUpdateSelfRestrictions } from 'src/common/pipes/update-restrictions/patient/update-self.pipe';
import { FindByAddressValidation } from 'src/common/pipes/url-data-validation-for-search/address-validation.pipe';
import { FindByEmailValidation } from 'src/common/pipes/url-data-validation-for-search/email-validation.pipe';
import { FindByIdValidation } from 'src/common/pipes/url-data-validation-for-search/id-validation.pipe';
import { FindByNameValidation } from 'src/common/pipes/url-data-validation-for-search/name-validation.pipe';
import { FindByPhoneNumberValidation } from 'src/common/pipes/url-data-validation-for-search/phone-number-validation.pipe';
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
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    PatientUpdateSelfRestrictions,
  )
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
