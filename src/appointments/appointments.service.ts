import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { GetDateObject } from 'src/utils/get-date-object';
import { Repository } from 'typeorm';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
  ) {}

  // A regra é: se o médico tem o dia disponível e for a data que o paciente quer, então esta será a data, por isso o funcionário poderá mudar
  // o campo "status" e somente na criação que ele vai poder ter acesso ao campo, mas não poderá atualizar nem deletar ele depois
  async Create(createAppointmentDTO: CreateAppointmentDTO) {
    const { doctor, patient, date } = createAppointmentDTO;
    const getDate = GetDateObject(date);

    const dataForCreation = {
      date: getDate,
      hour: createAppointmentDTO.hour,
      format: createAppointmentDTO.format,
      doctor: createAppointmentDTO.doctor,
      patient: createAppointmentDTO.patient,
      status: createAppointmentDTO.status,
    };

    const findDoctor = await this.doctorsService.FindById(doctor);

    if (!findDoctor) {
      throw new NotFoundException('Médico não encontrado');
    }

    const findPatient = await this.patientsService.FindById(patient);

    if (!findPatient) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const appointmentCreate =
      this.appointmentRepository.create(dataForCreation);

    const newAppointmentData =
      await this.appointmentRepository.save(appointmentCreate);

    return {
      ...newAppointmentData,
    };
  }
}
