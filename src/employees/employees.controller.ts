import { Body, Controller, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ParseToHourPipe } from 'src/common/pipes/hour-validation.pipe';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeAdminDTO } from './dto/update-employee-admin.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

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
}
