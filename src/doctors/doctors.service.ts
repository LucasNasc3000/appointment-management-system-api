import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { UpdateDoctorAdminDTO } from './dto/update-doctor-admin.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  async Create(createDoctorDTO: CreateDoctorDTO) {
    const doctorCreate = this.doctorRepository.create(createDoctorDTO);

    const newDoctorData = await this.doctorRepository.save(doctorCreate);

    return {
      ...newDoctorData,
    };
  }

  async UpdateSelf(id: string, updateDoctorDTO: UpdateDoctorDTO) {
    const allowedData = {
      email: updateDoctorDTO.email,
      name: updateDoctorDTO.name,
      password_hash: updateDoctorDTO.password_hash,
      phone_number: updateDoctorDTO.phone_number,
      address: updateDoctorDTO.address,
    };

    const findDoctorById = await this.doctorRepository.findOne({
      where: {
        id,
      },
    });

    if (!findDoctorById) {
      throw new NotFoundException('Médico não encontrado');
    }

    const doctorUpdate = await this.doctorRepository.preload({
      id,
      ...allowedData,
    });

    if (!doctorUpdate) {
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar funcionário',
      );
    }

    return this.doctorRepository.save(doctorUpdate);
  }

  async UpdateAdmin(id: string, updateDoctorAdminDTO: UpdateDoctorAdminDTO) {
    const allowedData = {
      email: updateDoctorAdminDTO.email,
      name: updateDoctorAdminDTO.name,
      password_hash: updateDoctorAdminDTO.password_hash,
      specialties: updateDoctorAdminDTO.specialties,
      academic_degree: updateDoctorAdminDTO.academic_degree,
      situation: updateDoctorAdminDTO.situation,
      workday_begin: updateDoctorAdminDTO.workday_begin,
      workday_end: updateDoctorAdminDTO.workday_end,
      phone_number: updateDoctorAdminDTO.phone_number,
      address: updateDoctorAdminDTO.address,
    };

    const findDoctorById = await this.doctorRepository.findOne({
      where: {
        id,
      },
    });

    if (!findDoctorById) {
      throw new NotFoundException('Médico não encontrado');
    }

    const doctorUpdate = await this.doctorRepository.preload({
      id,
      ...allowedData,
    });

    if (!doctorUpdate) {
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar dados de médico',
      );
    }

    return this.doctorRepository.save(doctorUpdate);
  }
}
