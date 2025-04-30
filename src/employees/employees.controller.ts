import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  Create(@Body() body: CreateEmployeeDTO) {
    return this.employeeService.Create(body);
  }
}
