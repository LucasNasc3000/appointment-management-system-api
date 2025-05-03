import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeAdminDTO } from './dto/update-employee-admin.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
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

  // Verificar se é um funcionário ou admin no guard ou middleware
  async UpdateSelf(id: string, updateEmployeeDTO: UpdateEmployeeDTO) {
    const allowedData = {
      email: updateEmployeeDTO.email,
      name: updateEmployeeDTO.name,
      password_hash: updateEmployeeDTO.password_hash,
      phone_number: updateEmployeeDTO.phone_number,
      address: updateEmployeeDTO.address,
    };

    const findEmployeeById = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });

    if (!findEmployeeById) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    const employeeUpdate = await this.employeeRepository.preload({
      id,
      ...allowedData,
    });

    if (!employeeUpdate) {
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar funcionário',
      );
    }

    return this.employeeRepository.save(employeeUpdate);
  }

  async UpdateAdmin(
    id: string,
    updateEmployeeAdminDTO: UpdateEmployeeAdminDTO,
  ) {
    const allowedData = {
      email: updateEmployeeAdminDTO.email,
      name: updateEmployeeAdminDTO.name,
      password_hash: updateEmployeeAdminDTO.password_hash,
      role: updateEmployeeAdminDTO.role,
      situation: updateEmployeeAdminDTO.situation,
      workday_begin: updateEmployeeAdminDTO.workday_begin,
      workday_end: updateEmployeeAdminDTO.workday_end,
      phone_number: updateEmployeeAdminDTO.phone_number,
      address: updateEmployeeAdminDTO.address,
    };

    const findEmployeeById = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });

    if (!findEmployeeById) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    const employeeUpdate = await this.employeeRepository.preload({
      id,
      ...allowedData,
    });

    if (!employeeUpdate) {
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar funcionário',
      );
    }

    return this.employeeRepository.save(employeeUpdate);
  }
}
