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
import { ParseToHourPipe } from 'src/common/pipes/hour-validation.pipe';
import { FindByEmailValidation } from 'src/common/pipes/searchDataValidationEmployees/email-validation.pipe';
import { FindByIdValidation } from 'src/common/pipes/searchDataValidationEmployees/id-validation.pipe';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { PaginationDTO } from './dto/pagination.dto';
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
  UpdateSelf(
    @Param('id') id: string,
    @Body() updateEmployeeDTO: UpdateEmployeeDTO,
  ) {
    return this.employeeService.UpdateSelf(id, updateEmployeeDTO);
  }

  @Patch('/update/admin/:id')
  UpdateAdmin(
    @Param('id') id: string,
    @Body() updateEmployeeAdminDTO: UpdateEmployeeAdminDTO,
  ) {
    return this.employeeService.UpdateAdmin(id, updateEmployeeAdminDTO);
  }

  @Get('/search/id/:id')
  @UsePipes(FindByIdValidation)
  FindById(@Param('id') id: string) {
    return this.employeeService.FindById(id);
  }

  @Get('/search/email/:email')
  @UsePipes(FindByEmailValidation)
  FindByEmail(@Param('email') email: string) {
    return this.employeeService.FindByEmail(email);
  }

  @Get('/search/cpf/:cpf')
  FindByCpf(@Param('cpf') cpf: string) {
    return this.employeeService.FindByCpf(cpf);
  }

  @Get('/search/phoneNumber/:phoneNumber')
  FindByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    return this.employeeService.FindByPhoneNumber(phoneNumber);
  }

  @Get('/search/address/:address')
  FindByAddress(@Param('address') address: string) {
    return this.employeeService.FindByAddress(address);
  }

  @Get('/search/name/:name')
  FindByName(
    @Query() paginationDto: PaginationDTO,
    @Param('name') name: string,
  ) {
    return this.employeeService.FindByName(paginationDto, name);
  }

  @Get('/search/role/:role')
  FindByRole(
    @Query() paginationDto: PaginationDTO,
    @Param('role') role: string,
  ) {
    return this.employeeService.FindByRole(paginationDto, role);
  }

  @Get('/search/situation/:situation')
  FindBySituation(
    @Query() paginationDto: PaginationDTO,
    @Param('situation') situation: string,
  ) {
    return this.employeeService.FindBySituation(paginationDto, situation);
  }

  @Get('/search/workdayBegin/:workdayBegin')
  FindByWorkdayBegin(
    @Query() paginationDto: PaginationDTO,
    @Param('workdayBegin') workdayBegin: string,
  ) {
    return this.employeeService.FindByWorkdayBegin(paginationDto, workdayBegin);
  }

  @Get('/search/workdayEnd/:workdayEnd')
  FindByWorkdayEnd(
    @Query() paginationDto: PaginationDTO,
    @Param('workdayEnd') workdayEnd: string,
  ) {
    return this.employeeService.FindByWorkdayEnd(paginationDto, workdayEnd);
  }
}
