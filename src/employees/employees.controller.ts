import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TokenPayloadDTO } from 'src/auth/dto/token-payload.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { AntiStatementUrl } from 'src/common/pipes/commom-pipes/anti-statements-url.pipe';
import { ParseToHourPipeUpdate } from 'src/common/pipes/commom-pipes/hour-validation-update.pipe';
import { ParseToHourPipe } from 'src/common/pipes/commom-pipes/hour-validation.pipe';
import { SituationValidation } from 'src/common/pipes/commom-pipes/situation-validation.pipe';
import { UUIDValidatorForUpdates } from 'src/common/pipes/commom-pipes/uuid-validation-updates.pipe';
import { EmployeeUpdateAdminRestrictions } from 'src/common/pipes/update-restrictions/employee/update-admin.pipe';
import { EmployeeUpdateSelfRestrictions } from 'src/common/pipes/update-restrictions/employee/update-self.pipe';
import { FindByAddressValidation } from 'src/common/pipes/url-data-validation-for-search/address-validation.pipe';
import { FindByCpfValidation } from 'src/common/pipes/url-data-validation-for-search/cpf-validation.pipe';
import { FindByEmailValidation } from 'src/common/pipes/url-data-validation-for-search/email-validation.pipe';
import { FindByHourField } from 'src/common/pipes/url-data-validation-for-search/hour-validation.pipe';
import { FindByIdValidation } from 'src/common/pipes/url-data-validation-for-search/id-validation.pipe';
import { FindByNameValidation } from 'src/common/pipes/url-data-validation-for-search/name-validation.pipe';
import { FindByPhoneNumberValidation } from 'src/common/pipes/url-data-validation-for-search/phone-number-validation.pipe';
import { FindByRoleValidation } from 'src/common/pipes/url-data-validation-for-search/role-validation.pipe';
import { FindBySituationValidation } from 'src/common/pipes/url-data-validation-for-search/situation-validation.pipe';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { PaginationDTO } from './dto/pagination-employee.dto';
import { UpdateEmployeeAdminDTO } from './dto/update-employee-admin.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

// Criar validações para updates e creates não aceitarem urls com valores
@UseGuards(AuthTokenGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @UsePipes(ParseToHourPipe)
  Create(@Body() body: CreateEmployeeDTO) {
    return this.employeeService.Create(body);
  }

  @Patch('/update/self/:id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    ParseToHourPipeUpdate,
    SituationValidation,
    EmployeeUpdateSelfRestrictions,
  )
  UpdateSelf(
    @Param('id') id: string,
    @Body() updateEmployeeDTO: UpdateEmployeeDTO,
    @TokenPayloadParam() tokenPayload: TokenPayloadDTO,
  ) {
    return this.employeeService.UpdateSelf(id, updateEmployeeDTO, tokenPayload);
  }

  @Patch('/update/admin/:id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    ParseToHourPipeUpdate,
    SituationValidation,
    EmployeeUpdateAdminRestrictions,
  )
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
  @UsePipes(AntiStatementUrl, FindByHourField)
  FindByWorkdayBegin(@Query() paginationDto: PaginationDTO) {
    return this.employeeService.FindByWorkdayBegin(paginationDto);
  }

  @Get('/search/workdayEnd/')
  @UsePipes(AntiStatementUrl, FindByHourField)
  FindByWorkdayEnd(@Query() paginationDto: PaginationDTO) {
    return this.employeeService.FindByWorkdayEnd(paginationDto);
  }
}
