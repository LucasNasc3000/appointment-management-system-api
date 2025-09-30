import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingServiceProtocol } from './hashing/hashing.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Doctor]),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AbortController],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
  ],
  exports: [HashingServiceProtocol],
})
export class AuthModule {}
