import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { REQUEST_TOKEN_PAYLOAD_KEY } from '../auth.constants';
import jwtConfig from '../config/jwt.config';
import { IS_PUBLIC_KEY } from '../set-metadata';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    @Inject(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @Inject(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.ExtractTokenFromHeader(request);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    if (!token) {
      throw new UnauthorizedException('Não logado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      const findEmployee = await this.employeeRepository.findOneBy({
        id: payload.sub,
        is_active: true,
      });

      const findDoctor = await this.doctorRepository.findOneBy({
        id: payload.sub,
        is_active: true,
      });

      if (!findEmployee && !findDoctor) {
        throw new UnauthorizedException('Usuário inválido');
      }

      request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  ExtractTokenFromHeader(request: Request): string | undefined {
    const authorization = request.headers?.authorization;

    if (!authorization || typeof authorization !== 'string') return;

    return authorization.split(' ')[1];
  }
}
