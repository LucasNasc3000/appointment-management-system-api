import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { PatientsService } from 'src/patients/patients.service';
import { GetDateObject } from 'src/utils/get-date-object';
import { GetDateObjectDateSearch } from 'src/utils/get-date-object-date-search';
import { Repository } from 'typeorm';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { PaginationDTO } from './dto/pagination-appointment.dto';
import { UpdateAppointmentDTO } from './dto/update-appointment.dto';
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

    if (findDoctor.situation !== 'empregado') {
      throw new ForbiddenException('O médico não está empregado no momento');
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

  async Update(id: string, updateAppointmentDTO: UpdateAppointmentDTO) {
    const allowedData = {
      date: updateAppointmentDTO.date,
      hour: updateAppointmentDTO.hour,
      format: updateAppointmentDTO.format,
      status: updateAppointmentDTO.status,
    };

    const findAppointmentById = await this.appointmentRepository.findOne({
      where: {
        id,
      },
    });

    if (!findAppointmentById) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    const appointmentUpdate = await this.appointmentRepository.preload({
      id,
      ...allowedData,
    });

    if (!appointmentUpdate) {
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar dados do agendamento',
      );
    }

    return this.appointmentRepository.save(appointmentUpdate);
  }

  async FindById(id: string) {
    const appointmentFindById = await this.appointmentRepository.findOneBy({
      id,
    });

    if (!appointmentFindById) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    return appointmentFindById;
  }

  async FindByDate(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const stringToDate = GetDateObjectDateSearch(value);
    const initialDate = stringToDate[0];
    const finalDate = stringToDate[1];

    const appointmentFindByDate = await this.appointmentRepository
      .createQueryBuilder('appointments')
      .where('appointments.date BETWEEN :initialDate AND :finalDate', {
        initialDate,
        finalDate,
      })
      .take(limit)
      .skip(offset)
      .getMany();

    if (!appointmentFindByDate) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por agendamentos',
      );
    }

    if (appointmentFindByDate.length < 1) {
      throw new NotFoundException('Agendamentos não encontrados');
    }

    return appointmentFindByDate;
  }

  async FindByHour(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const appointmentFindByHour = await this.appointmentRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        hour: value,
      },
    });

    if (!appointmentFindByHour) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por agendamentos',
      );
    }

    if (appointmentFindByHour.length < 1) {
      throw new NotFoundException('agendamentos não encontrados');
    }

    return appointmentFindByHour;
  }

  async FindByFormat(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const appointmentFindByFormat = await this.appointmentRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        format: value,
      },
    });

    if (!appointmentFindByFormat) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por agendamentos',
      );
    }

    if (appointmentFindByFormat.length < 1) {
      throw new NotFoundException('agendamentos não encontrados');
    }

    return appointmentFindByFormat;
  }

  async FindByStatus(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const appointmentFindByStatus = await this.appointmentRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        status: value,
      },
    });

    if (!appointmentFindByStatus) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por agendamentos',
      );
    }

    if (appointmentFindByStatus.length < 1) {
      throw new NotFoundException('agendamentos não encontrados');
    }

    return appointmentFindByStatus;
  }

  async FindByPatient(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const appointmentFindByPatient = await this.appointmentRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        patient: {
          id: value,
        },
      },
    });

    if (!appointmentFindByPatient) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por Agendamentos',
      );
    }

    if (appointmentFindByPatient.length < 1) {
      throw new NotFoundException('Agendamentos não encontrados');
    }

    return appointmentFindByPatient;
  }

  async FindByDoctor(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const appointmentFindByDoctor = await this.appointmentRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        doctor: {
          id: value,
        },
      },
    });

    if (!appointmentFindByDoctor) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por Agendamentos',
      );
    }

    if (appointmentFindByDoctor.length < 1) {
      throw new NotFoundException('Agendamentos não encontrados');
    }

    return appointmentFindByDoctor;
  }
}
