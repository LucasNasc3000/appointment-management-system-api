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
import { DoctorUpdateAdminRestrictions } from 'src/common/pipes/update-restrictions/doctor/update-admin.pipe';
import { DoctorUpdateSelfRestrictions } from 'src/common/pipes/update-restrictions/doctor/update-self.pipe';
import { FindByAddressValidation } from 'src/common/pipes/url-data-validation-for-search/address-validation.pipe';
import { FindByCpfValidation } from 'src/common/pipes/url-data-validation-for-search/cpf-validation.pipe';
import { FindByCrmValidation } from 'src/common/pipes/url-data-validation-for-search/crm-validation.pipe';
import { FindByEmailValidation } from 'src/common/pipes/url-data-validation-for-search/email-validation.pipe';
import { FindByHourField } from 'src/common/pipes/url-data-validation-for-search/hour-validation.pipe';
import { FindByIdValidation } from 'src/common/pipes/url-data-validation-for-search/id-validation.pipe';
import { FindByNameValidation } from 'src/common/pipes/url-data-validation-for-search/name-validation.pipe';
import { FindByPhoneNumberValidation } from 'src/common/pipes/url-data-validation-for-search/phone-number-validation.pipe';
import { FindBySituationValidation } from 'src/common/pipes/url-data-validation-for-search/situation-validation.pipe';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { PaginationDTO } from './dto/pagination-doctor.dto';
import { UpdateDoctorAdminDTO } from './dto/update-doctor-admin.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}

  @Post()
  @UsePipes(ParseToHourPipe)
  Create(@Body() body: CreateDoctorDTO) {
    return this.doctorService.Create(body);
  }

  @Patch('/update/self/:id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    DoctorUpdateSelfRestrictions,
    ParseToHourPipeUpdate,
  )
  UpdateSelf(
    @Param('id') id: string,
    @Body() updateDoctorDTO: UpdateDoctorDTO,
  ) {
    return this.doctorService.UpdateSelf(id, updateDoctorDTO);
  }

  @Patch('/update/admin/:id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    DoctorUpdateAdminRestrictions,
    ParseToHourPipeUpdate,
  )
  UpdateAdmin(
    @Param('id') id: string,
    @Body() updateDoctorAdminDTO: UpdateDoctorAdminDTO,
  ) {
    return this.doctorService.UpdateAdmin(id, updateDoctorAdminDTO);
  }

  @Get('/search/id/:id')
  @UsePipes(AntiStatementUrl, FindByIdValidation)
  FindById(@Param('id') id: string) {
    return this.doctorService.FindById(id);
  }

  @Get('/search/email/:email')
  @UsePipes(AntiStatementUrl, FindByEmailValidation)
  FindByEmail(@Param('email') email: string) {
    return this.doctorService.FindByEmail(email);
  }

  @Get('/search/cpf/:cpf')
  @UsePipes(AntiStatementUrl, FindByCpfValidation)
  FindByCpf(@Param('cpf') cpf: string) {
    return this.doctorService.FindByCpf(cpf);
  }

  @Get('/search/crm/:crm')
  @UsePipes(AntiStatementUrl, FindByCrmValidation)
  FindByCrm(@Param('crm') crm: string) {
    return this.doctorService.FindByCrm(crm);
  }

  @Get('/search/phoneNumber/:phoneNumber')
  @UsePipes(AntiStatementUrl, FindByPhoneNumberValidation)
  FindByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.doctorService.FindByPhoneNumber(phoneNumber);
  }

  @Get('/search/address/:address')
  @UsePipes(AntiStatementUrl, FindByAddressValidation)
  FindByAddress(@Param('address') address: string) {
    return this.doctorService.FindByAddress(address);
  }

  @Get('/search/name/')
  @UsePipes(AntiStatementUrl, FindByNameValidation)
  FindByName(@Query() paginationDto: PaginationDTO) {
    return this.doctorService.FindByName(paginationDto);
  }

  @Get('/search/specialty/')
  @UsePipes(AntiStatementUrl)
  FindBySpecialty(@Query() paginationDto: PaginationDTO) {
    return this.doctorService.FindBySpecialty(paginationDto);
  }

  @Get('/search/academicDegree/')
  @UsePipes(AntiStatementUrl)
  FindByAcademicDegree(@Query() paginationDto: PaginationDTO) {
    return this.doctorService.FindByAcademicDegree(paginationDto);
  }

  @Get('/search/situation/')
  @UsePipes(AntiStatementUrl, FindBySituationValidation)
  FindBySituation(@Query() paginationDto: PaginationDTO) {
    return this.doctorService.FindBySituation(paginationDto);
  }

  @Get('/search/workdayBegin/')
  @UsePipes(AntiStatementUrl, FindByHourField)
  FindByWorkdayBegin(@Query() paginationDto: PaginationDTO) {
    return this.doctorService.FindByWorkdayBegin(paginationDto);
  }

  @Get('/search/workdayEnd/')
  @UsePipes(AntiStatementUrl, FindByHourField)
  FindByWorkdayEnd(@Query() paginationDto: PaginationDTO) {
    return this.doctorService.FindByWorkdayEnd(paginationDto);
  }
}
