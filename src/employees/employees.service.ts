import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async Create(createEmployeeDTO: CreateEmployeeDTO) {
    const employeeCreate = this.employeeRepository.create(createEmployeeDTO);

    this.employeeRepository.save(employeeCreate);

    return {
      ...employeeCreate,
    };
  }
}
