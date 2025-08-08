import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    DoctorsModule,
    PatientsModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
