import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}
