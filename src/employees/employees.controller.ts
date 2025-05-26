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
import { ParseToHourPipeUpdate } from 'src/common/pipes/hour-validation-update.pipe';
import { ParseToHourPipe } from 'src/common/pipes/hour-validation.pipe';
import { FindByAddressValidation } from 'src/common/pipes/url-data-validation-for-search/address-validation.pipe';
import { FindByCpfValidation } from 'src/common/pipes/url-data-validation-for-search/cpf-validation.pipe';
import { FindByEmailValidation } from 'src/common/pipes/url-data-validation-for-search/email-validation.pipe';
import { FindByWorkday } from 'src/common/pipes/url-data-validation-for-search/hour-validation.pipe';
import { FindByIdValidation } from 'src/common/pipes/url-data-validation-for-search/id-validation.pipe';
import { FindByNameValidation } from 'src/common/pipes/url-data-validation-for-search/name-validation.pipe';
import { FindByPhoneNumberValidation } from 'src/common/pipes/url-data-validation-for-search/phone-number-validation.pipe';
import { FindByRoleValidation } from 'src/common/pipes/url-data-validation-for-search/role-validation.pipe';
import { FindBySituationValidation } from 'src/common/pipes/url-data-validation-for-search/situation-validation.pipe';
import { UUIDValidatorForUpdates } from 'src/common/pipes/uuid-validation-updates.pipe';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { PaginationDTO } from './dto/pagination-employee.dto';
import { UpdateEmployeeAdminDTO } from './dto/update-employee-admin.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

// Criar validações para updates e creates não aceitarem urls com valores
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @UsePipes(ParseToHourPipe)
  Create(@Body() body: CreateEmployeeDTO) {
    return this.employeeService.Create(body);
  }

  @Patch('/update/self/:id')
  @UsePipes(ParseToHourPipeUpdate, AntiStatementUrl, UUIDValidatorForUpdates)
  UpdateSelf(
    @Param('id') id: string,
    @Body() updateEmployeeDTO: UpdateEmployeeDTO,
  ) {
    return this.employeeService.UpdateSelf(id, updateEmployeeDTO);
  }

  @Patch('/update/admin/:id')
  @UsePipes(AntiStatementUrl, ParseToHourPipeUpdate, UUIDValidatorForUpdates)
  UpdateAdmin(
    @Param('id') id: string,
    @Body() updateEmployeeAdminDTO: UpdateEmployeeAdminDTO,
  ) {
    return this.employeeService.UpdateAdmin(id, updateEmployeeAdminDTO);
  }

  @Get('/search/id/:id')
  @UsePipes(AntiStatementUrl, FindByIdValidation)
  FindById(@Param('id') id: string) {
    return this.employeeService.FindById(id);
  }

  @Get('/search/email/:email')
  @UsePipes(AntiStatementUrl, FindByEmailValidation)
  FindByEmail(@Param('email') email: string) {
    return this.employeeService.FindByEmail(email);
  }

  @Get('/search/cpf/:cpf')
  @UsePipes(AntiStatementUrl, FindByCpfValidation)
  FindByCpf(@Param('cpf') cpf: string) {
    return this.employeeService.FindByCpf(cpf);
  }

  @Get('/search/phoneNumber/:phoneNumber')
  @UsePipes(AntiStatementUrl, FindByPhoneNumberValidation)
  FindByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.employeeService.FindByPhoneNumber(phoneNumber);
  }

  @Get('/search/address/:address')
  @UsePipes(AntiStatementUrl, FindByAddressValidation)
  FindByAddress(@Param('address') address: string) {
    return this.employeeService.FindByAddress(address);
  }

  @Get('/search/name/')
  @UsePipes(AntiStatementUrl, FindByNameValidation)
  FindByName(@Query() paginationDto: PaginationDTO) {
    return this.employeeService.FindByName(paginationDto);
  }

  @Get('/search/role/')
  @UsePipes(AntiStatementUrl, FindByRoleValidation)
  FindByRole(@Query() paginationDto: PaginationDTO) {
    return this.employeeService.FindByRole(paginationDto);
  }

  @Get('/search/situation/')
  @UsePipes(AntiStatementUrl, FindBySituationValidation)
  FindBySituation(@Query() paginationDto: PaginationDTO) {
    return this.employeeService.FindBySituation(paginationDto);
  }

  @Get('/search/workdayBegin/')
  @UsePipes(AntiStatementUrl, FindByWorkday)
  FindByWorkdayBegin(@Query() paginationDto: PaginationDTO) {
    return this.employeeService.FindByWorkdayBegin(paginationDto);
  }

  @Get('/search/workdayEnd/')
  @UsePipes(AntiStatementUrl, FindByWorkday)
  FindByWorkdayEnd(@Query() paginationDto: PaginationDTO) {
    return this.employeeService.FindByWorkdayEnd(paginationDto);
  }
}
