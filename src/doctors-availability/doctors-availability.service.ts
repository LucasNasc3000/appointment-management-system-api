import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Repository } from 'typeorm';
import { GetDateObject } from '../utils/get-date-object';
import { CreateDoctorsAvailabilityDTO } from './dto/create-da.dto';
import { UpdateDoctorsAvailabilityAdminDTO } from './dto/update-da-admin.dto';
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

  async UpdateSelf(
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

  async UpdateAdmin(
    id: string,
    updateDoctorsAvailabilityAdminDTO: UpdateDoctorsAvailabilityAdminDTO,
  ) {
    const allowedData = {
      date: updateDoctorsAvailabilityAdminDTO.date,
      hour_from: updateDoctorsAvailabilityAdminDTO.hour_from,
      hour_to: updateDoctorsAvailabilityAdminDTO.hour_to,
      situation: updateDoctorsAvailabilityAdminDTO.situation,
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
        'Erro ao tentar atualizar dados do registro de disponibilidade do médico',
      );
    }

    return this.doctorsAvailabilityRepository.save(doctorUpdate);
  }
}
