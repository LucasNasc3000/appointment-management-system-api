import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async Create(createPatientDTO: CreatePatientDTO) {
    const patientCreate = this.patientRepository.create(createPatientDTO);

    const newPatientData = await this.patientRepository.save(patientCreate);

    return {
      ...newPatientData,
    };
  }

  async Update(id: string, updatePatientDTO: UpdatePatientDTO) {
    const allowedData = {
      email: updatePatientDTO.email,
      name: updatePatientDTO.name,
      address: updatePatientDTO.address,
      phone_number: updatePatientDTO.phone_number,
    };

    const findPatientById = await this.patientRepository.findOne({
      where: {
        id,
      },
    });

    if (!findPatientById) {
      throw new NotFoundException('Paciente não encontrado');
    }

    const patientUpdate = await this.patientRepository.preload({
      id,
      ...allowedData,
    });

    if (!patientUpdate) {
      throw new InternalServerErrorException(
        'Erro ao tentar atualizar dados de paciente',
      );
    }

    return this.patientRepository.save(patientUpdate);
  }

  async FindById(id: string) {
    const patientFindById = await this.patientRepository.findOneBy({
      id,
    });

    if (!patientFindById) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return patientFindById;
  }

  async FindByCpf(cpf: string) {
    const patientFindByCpf = await this.patientRepository.findOneBy({
      cpf,
    });

    if (!patientFindByCpf) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return patientFindByCpf;
  }

  async FindByEmail(email: string) {
    const patientFindByEmail = await this.patientRepository.findOneBy({
      email,
    });

    if (!patientFindByEmail) {
      throw new NotFoundException('Paciente não encontrado');
    }

    return patientFindByEmail;
  }
}
