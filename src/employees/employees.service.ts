import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenPayloadDTO } from 'src/auth/dto/token-payload.dto';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { Like, Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { PaginationDTO } from './dto/pagination-employee.dto';
import { UpdateEmployeeAdminDTO } from './dto/update-employee-admin.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async Create(createEmployeeDTO: CreateEmployeeDTO) {
    const password_hash = await this.hashingService.Hash(
      createEmployeeDTO.password_hash,
    );

    const employeeCreateData = {
      cpf: createEmployeeDTO.cpf,
      email: createEmployeeDTO.email,
      name: createEmployeeDTO.name,
      password_hash,
      role: createEmployeeDTO.role,
      situation: createEmployeeDTO.situation,
      workday_begin: createEmployeeDTO.workday_begin,
      workday_end: createEmployeeDTO.workday_end,
      phone_number: createEmployeeDTO.phone_number,
      address: createEmployeeDTO.address,
    };

    const employeeCreate = this.employeeRepository.create(employeeCreateData);

    const newEmployee = this.employeeRepository.save(employeeCreate);

    // Tirar o return na hora de finalizar o projeto

    return {
      ...newEmployee,
    };
  }

  // Verificar se é um funcionário ou admin no guard ou middleware
  async UpdateSelf(
    id: string,
    updateEmployeeDTO: UpdateEmployeeDTO,
    tokenPayload: TokenPayloadDTO,
  ) {
    const allowedData = {
      email: updateEmployeeDTO.email,
      name: updateEmployeeDTO.name,
      password_hash: updateEmployeeDTO.password_hash,
      phone_number: updateEmployeeDTO.phone_number,
      address: updateEmployeeDTO.address,
    };

    if (id !== tokenPayload.sub) {
      throw new ForbiddenException('Ação não permitida');
    }

    if (updateEmployeeDTO?.password_hash) {
      const passwordHash = await this.hashingService.Hash(
        updateEmployeeDTO.password_hash,
      );

      allowedData.password_hash = passwordHash;
    }

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
        'Erro ao tentar atualizar dados de funcionário',
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

  async FindByName(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const employeeFindByName = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        name: Like(`${value}%`),
      },
    });

    if (!employeeFindByName) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por funcionários',
      );
    }

    if (employeeFindByName.length < 1) {
      throw new NotFoundException('Funcionários não encontrados');
    }

    return employeeFindByName;
  }

  async FindByPhoneNumber(phoneNumber: string) {
    const employeeFindByPhoneNumber = await this.employeeRepository.findOneBy({
      phone_number: phoneNumber,
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

  async FindByRole(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const employeeFindByRole = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        role: value,
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

  async FindBySituation(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const employeeFindBySituation = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        situation: value,
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

  async FindByWorkdayBegin(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const employeeFindByWorkdayBegin = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        workday_begin: value,
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

  async FindByWorkdayEnd(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const employeeFindByWorkdayEnd = await this.employeeRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        workday_end: value,
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
