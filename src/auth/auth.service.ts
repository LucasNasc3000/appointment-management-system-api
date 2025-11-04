import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Repository } from 'typeorm';
import jwtConfig from './config/jwt.config';
import { LoginDTO } from './dto/login.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { HashingServiceProtocol } from './hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtService: JwtService,
  ) {}

  async Login(loginDTO: LoginDTO) {
    let employeeOrDoctorData: Doctor | Employee;

    const findEmployee = await this.employeeRepository.findOneBy({
      email: loginDTO.email,
      is_active: true,
    });

    const findDoctor = await this.doctorRepository.findOneBy({
      email: loginDTO.email,
      is_active: true,
    });

    if (!findEmployee && !findDoctor) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    if (findEmployee) employeeOrDoctorData = { ...findEmployee };
    if (findDoctor) employeeOrDoctorData = { ...findDoctor };

    const passwordCompare = await this.hashingService.Compare(
      loginDTO.password,
      employeeOrDoctorData.password_hash,
    );

    if (!passwordCompare) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return this.CreateTokens(employeeOrDoctorData);
  }

  async CreateTokens(employeeOrDoctorData: Employee | Doctor) {
    const accessToken = await this.SignJwtAsync<Partial<Employee | Doctor>>(
      employeeOrDoctorData.id,
      this.jwtConfiguration.jwtTtl,
      { email: employeeOrDoctorData.email },
    );

    const refreshToken = await this.SignJwtAsync<Partial<Employee | Doctor>>(
      employeeOrDoctorData.id,
      this.jwtConfiguration.jwtRefreshTtl,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async SignJwtAsync<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async RefreshTokens(refreshTokenDto: RefreshTokenDTO) {
    try {
      let employeeOrDoctorData: Doctor | Employee;

      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const findEmployee = await this.employeeRepository.findOneBy({
        id: sub,
        is_active: true,
      });

      const findDoctor = await this.doctorRepository.findOneBy({
        id: sub,
        is_active: true,
      });

      if (!findEmployee && !findDoctor) {
        // O Error vai pular para o Unauthorized no catch e a mensagem será esta
        throw new Error('Usuário não encontrado ou inválido');
      }

      if (findEmployee) employeeOrDoctorData = { ...findEmployee };
      if (findDoctor) employeeOrDoctorData = { ...findDoctor };

      return this.CreateTokens(employeeOrDoctorData);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
