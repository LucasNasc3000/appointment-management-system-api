import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Repository } from 'typeorm';
import { CreateDoctorsAvailabilityDTO } from './dto/create-da.dto';
import { DoctorsAvailability } from './entities/doctors-availability.entity';

@Injectable()
export class DoctorsAvailabilityService {
  constructor(
    @InjectRepository(DoctorsAvailability)
    private readonly doctorsAvailabilityRepository: Repository<DoctorsAvailability>,
    private readonly doctorsService: DoctorsService,
  ) {}

  async Create(createDoctorsAvailabilityDTO: CreateDoctorsAvailabilityDTO) {
    const { doctor } = createDoctorsAvailabilityDTO;

    const date = new Date();
    const stringFormatDate = date.toLocaleDateString('pt-br', {
      dateStyle: 'short',
      hour: '2-digit',
      hour12: false,
    });

    const dataForCreation = {
      date: stringFormatDate,
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
}
