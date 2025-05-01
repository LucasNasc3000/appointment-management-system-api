import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ParseToHourPipe } from 'src/common/pipes/hour-validation.pipe';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  @UsePipes(ParseToHourPipe)
  Create(@Body() body: CreateEmployeeDTO) {
    return this.employeeService.Create(body);
  }
}
