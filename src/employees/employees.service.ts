import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { PaginationDTO } from './dto/pagination.dto';
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

  async FindById(id: string) {
    const employeeFindById = await this.employeeRepository.findOneBy({
      id,
    });

    if (!employeeFindById) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return employeeFindById;
  }

  // Validar os dados dos parametros (e de onde mais eles vierem. Para todas as buscas)
  async FindByCpf(cpf: string) {
    const employeeFindByCpf = await this.employeeRepository.findOneBy({
      cpf,
    });

    if (!employeeFindByCpf) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return employeeFindByCpf;
  }

  async FindByEmail(email: string) {
    const employeeFindByEmail = await this.employeeRepository.findOneBy({
      email,
    });

    if (!employeeFindByEmail) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return employeeFindByEmail;
  }

  async FindByName(paginationDTO: PaginationDTO, name: string) {
    const { limit, offset } = paginationDTO;

    const employeeFindByName = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        name: Like(`${name}%`),
      },
    });

    if (!employeeFindByName) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return employeeFindByName;
  }

  async FindByPhoneNumber(PhoneNumber: string) {
    const employeeFindByPhoneNumber = await this.employeeRepository.findOneBy({
      phone_number: PhoneNumber,
    });

    if (!employeeFindByPhoneNumber) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return employeeFindByPhoneNumber;
  }

  async FindByAddress(address: string) {
    const employeeFindByAddress = await this.employeeRepository.findOneBy({
      address: address,
    });

    if (!employeeFindByAddress) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    return employeeFindByAddress;
  }

  async FindByRole(paginationDTO: PaginationDTO, role: string) {
    const { limit, offset } = paginationDTO;

    const employeeFindByRole = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        role,
      },
    });

    if (!employeeFindByRole) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por funcionários',
      );
    }

    if (employeeFindByRole.length < 1) {
      throw new NotFoundException('Funcionários não encontrados');
    }

    return employeeFindByRole;
  }

  async FindBySituation(paginationDTO: PaginationDTO, situation: string) {
    const { limit, offset } = paginationDTO;

    const employeeFindBySituation = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        situation,
      },
    });

    if (!employeeFindBySituation) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por funcionários',
      );
    }

    if (employeeFindBySituation.length < 1) {
      throw new NotFoundException('Funcionários não encontrados');
    }

    return employeeFindBySituation;
  }

  async FindByWorkdayBegin(paginationDTO: PaginationDTO, workdayBegin: string) {
    const { limit, offset } = paginationDTO;

    const employeeFindByWorkdayBegin = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        workday_begin: Like(`${workdayBegin}%`),
      },
    });

    if (!employeeFindByWorkdayBegin) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por funcionários',
      );
    }

    if (employeeFindByWorkdayBegin.length < 1) {
      throw new NotFoundException('Funcionários não encontrados');
    }

    return employeeFindByWorkdayBegin;
  }

  async FindByWorkdayEnd(paginationDTO: PaginationDTO, workdayEnd: string) {
    const { limit, offset } = paginationDTO;

    const employeeFindByWorkdayEnd = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        workday_end: Like(`${workdayEnd}%`),
      },
    });

    if (!employeeFindByWorkdayEnd) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por funcionários',
      );
    }

    if (employeeFindByWorkdayEnd.length < 1) {
      throw new NotFoundException('Funcionários não encontrados');
    }

    return employeeFindByWorkdayEnd;
  }
}
