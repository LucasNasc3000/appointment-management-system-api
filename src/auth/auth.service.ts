import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { HashingServiceProtocol } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async Login(loginDTO: LoginDTO) {
    let employeeOrDoctorData: Doctor | Employee;

    const findEmployee = await this.employeeRepository.findOneBy({
      email: loginDTO.email,
    });

    const findDoctor = await this.doctorRepository.findOneBy({
      email: loginDTO.email,
    });

    if (!findEmployee && !findDoctor) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    if (findEmployee) employeeOrDoctorData = { ...findEmployee };
    if (findDoctor) employeeOrDoctorData = { ...findDoctor };

    const passwordCompare = this.hashingService.Compare(
      loginDTO.password,
      employeeOrDoctorData.password_hash,
    );

    if (!passwordCompare) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return {
      message: 'Usuário logado',
    };
  }
}
