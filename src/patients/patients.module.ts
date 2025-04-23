import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientsController } from './patients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
})
export class PatientsModule {}
