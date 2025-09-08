import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { GetDateObjectDateSearch } from 'src/utils/get-date-object-date-search';
import { Repository } from 'typeorm';
import { GetDateObject } from '../utils/get-date-object';
import { CreateDoctorsAvailabilityDTO } from './dto/create-da.dto';
import { PaginationDTO } from './dto/pagination-da.dto';
import { UpdateDoctorsAvailabilityDTO } from './dto/update-da.dto';
import { DoctorsAvailability } from './entities/doctors-availability.entity';

@Injectable()
export class DoctorsAvailabilityService {
  constructor(
    @InjectRepository(DoctorsAvailability)
    private readonly doctorsAvailabilityRepository: Repository<DoctorsAvailability>,
    private readonly doctorsService: DoctorsService,
  ) {}

  async Create(createDoctorsAvailabilityDTO: CreateDoctorsAvailabilityDTO) {
    const { doctor, date } = createDoctorsAvailabilityDTO;
    const getDate = GetDateObject(date);

    const dataForCreation = {
      date: getDate,
      hour_from: createDoctorsAvailabilityDTO.hour_from,
      hour_to: createDoctorsAvailabilityDTO.hour_to,
      situation: createDoctorsAvailabilityDTO.situation,
      doctor: createDoctorsAvailabilityDTO.doctor,
    };

    const findDoctor = await this.doctorsService.FindById(doctor);

    if (!findDoctor) {
      throw new NotFoundException('Médico não encontrado');
    }

    const doctorsAvailabilityCreate =
      this.doctorsAvailabilityRepository.create(dataForCreation);

    const newDoctorsAvailabilityData =
      await this.doctorsAvailabilityRepository.save(doctorsAvailabilityCreate);

    return {
      ...newDoctorsAvailabilityData,
    };
  }

  async Update(
    id: string,
    updateDoctorsAvailabilityDTO: UpdateDoctorsAvailabilityDTO,
  ) {
    const allowedData = {
      date: updateDoctorsAvailabilityDTO.date,
      hour_from: updateDoctorsAvailabilityDTO.hour_from,
      hour_to: updateDoctorsAvailabilityDTO.hour_to,
    };

    const findDoctorById = await this.doctorsAvailabilityRepository.findOne({
      where: {
        id,
      },
    });

    if (!findDoctorById) {
      throw new NotFoundException(
        'Registro de disponibilidade do médico não encontrado',
      );
    }

    const doctorUpdate = await this.doctorsAvailabilityRepository.preload({
      id,
      ...allowedData,
    });

    if (!doctorUpdate) {
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar disponibilidade do médico',
      );
    }

    return this.doctorsAvailabilityRepository.save(doctorUpdate);
  }

  async FindByDate(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const stringToDate = GetDateObjectDateSearch(value);
    const initialDate = stringToDate[0];
    const finalDate = stringToDate[1];

    const doctorsAvailabilityFindByDate =
      await this.doctorsAvailabilityRepository
        .createQueryBuilder('doctorsAvailability')
        .where('doctorsAvailability.date BETWEEN :initialDate AND :finalDate', {
          initialDate,
          finalDate,
        })
        .take(limit)
        .skip(offset)
        .leftJoin('doctorsAvailability.doctor', 'doctor')
        .select([
          'doctorsAvailability',
          'doctor.id',
          'doctor.name',
          'doctor.situation',
        ])
        .getMany();

    if (!doctorsAvailabilityFindByDate) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por registros de disponibilidade do médico',
      );
    }

    if (doctorsAvailabilityFindByDate.length < 1) {
      throw new NotFoundException(
        'Registros de disponibilidade do médico não encontrados',
      );
    }

    return doctorsAvailabilityFindByDate;
  }

  async FindByHourFrom(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorsAvailabilityFindByHourFrom =
      await this.doctorsAvailabilityRepository.find({
        take: limit,
        skip: offset,
        order: {
          id: 'desc',
        },
        where: {
          hour_from: value,
        },
        relations: {
          doctor: true,
        },
        select: {
          doctor: {
            id: true,
            name: true,
            situation: true,
          },
        },
      });

    if (!doctorsAvailabilityFindByHourFrom) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por disponibilidade do médico',
      );
    }

    if (doctorsAvailabilityFindByHourFrom.length < 1) {
      throw new NotFoundException(
        'Registros de disponibilidade do médico não encontrados',
      );
    }

    return doctorsAvailabilityFindByHourFrom;
  }

  async FindByHourTo(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorsAvailabilityFindByHourTo =
      await this.doctorsAvailabilityRepository.find({
        take: limit,
        skip: offset,
        order: {
          id: 'desc',
        },
        where: {
          hour_to: value,
        },
        relations: {
          doctor: true,
        },
        select: {
          doctor: {
            id: true,
            name: true,
            situation: true,
          },
        },
      });

    if (!doctorsAvailabilityFindByHourTo) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por disponibilidade do médico',
      );
    }

    if (doctorsAvailabilityFindByHourTo.length < 1) {
      throw new NotFoundException(
        'Registros de disponibilidade do médico não encontrados',
      );
    }

    return doctorsAvailabilityFindByHourTo;
  }

  async FindByDoctor(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const appointmentFindByDoctor =
      await this.doctorsAvailabilityRepository.find({
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
        relations: {
          doctor: true,
        },
        select: {
          doctor: {
            id: true,
            name: true,
            situation: true,
          },
        },
      });

    if (!appointmentFindByDoctor) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por disponibilidade do médico',
      );
    }

    if (appointmentFindByDoctor.length < 1) {
      throw new NotFoundException(
        'Registros de disponibilidade do médico não encontrados',
      );
    }

    return appointmentFindByDoctor;
  }
}
