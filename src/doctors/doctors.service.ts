import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { PaginationDTO } from './dto/pagination-doctor.dto';
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

  async FindById(id: string | Doctor) {
    const stringFormatId = String(id);

    const doctorFindById = await this.doctorRepository.findOneBy({
      id: stringFormatId,
    });

    if (!doctorFindById) {
      throw new NotFoundException('Médico não encontrado');
    }

    return doctorFindById;
  }

  async FindByCpf(cpf: string) {
    const doctorFindByCpf = await this.doctorRepository.findOneBy({
      cpf,
    });

    if (!doctorFindByCpf) {
      throw new NotFoundException('Médico não encontrado');
    }

    return doctorFindByCpf;
  }

  async FindByEmail(email: string) {
    const doctorFindByEmail = await this.doctorRepository.findOneBy({
      email,
    });

    if (!doctorFindByEmail) {
      throw new NotFoundException('Médico não encontrado');
    }

    return doctorFindByEmail;
  }

  async FindByCrm(crm: string) {
    const doctorFindByCpf = await this.doctorRepository.findOneBy({
      crm,
    });

    if (!doctorFindByCpf) {
      throw new NotFoundException('Médico não encontrado');
    }

    return doctorFindByCpf;
  }

  async FindByName(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorFindByName = await this.doctorRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        name: Like(`${value}%`),
      },
    });

    if (!doctorFindByName) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por médicos',
      );
    }

    if (doctorFindByName.length < 1) {
      throw new NotFoundException('Médicos não encontrados');
    }

    return doctorFindByName;
  }

  async FindBySpecialty(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorFindByName = await this.doctorRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        specialties: Like(`%${value}%`),
      },
    });

    if (!doctorFindByName) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por médicos',
      );
    }

    if (doctorFindByName.length < 1) {
      throw new NotFoundException('Médicos não encontrados');
    }

    return doctorFindByName;
  }

  async FindByAcademicDegree(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorFindByName = await this.doctorRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        academic_degree: Like(`${value}%`),
      },
    });

    if (!doctorFindByName) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por médicos',
      );
    }

    if (doctorFindByName.length < 1) {
      throw new NotFoundException('Médicos não encontrados');
    }

    return doctorFindByName;
  }

  async FindBySituation(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorFindBySituation = await this.doctorRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        situation: value,
      },
    });

    if (!doctorFindBySituation) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por médicos',
      );
    }

    if (doctorFindBySituation.length < 1) {
      throw new NotFoundException('Médicos não encontrados');
    }

    return doctorFindBySituation;
  }

  async FindByWorkdayBegin(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorFindByWorkdayBegin = await this.doctorRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        workday_begin: value,
      },
    });

    if (!doctorFindByWorkdayBegin) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por médicos',
      );
    }

    if (doctorFindByWorkdayBegin.length < 1) {
      throw new NotFoundException('Médicos não encontrados');
    }

    return doctorFindByWorkdayBegin;
  }

  async FindByWorkdayEnd(paginationDTO: PaginationDTO) {
    const { limit, offset, value } = paginationDTO;

    const doctorFindByWorkdayEnd = await this.doctorRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: 'desc',
      },
      where: {
        workday_end: value,
      },
    });

    if (!doctorFindByWorkdayEnd) {
      throw new InternalServerErrorException(
        'Erro desconhecido ao tentar pesquisar por médicos',
      );
    }

    if (doctorFindByWorkdayEnd.length < 1) {
      throw new NotFoundException('Médicos não encontrados');
    }

    return doctorFindByWorkdayEnd;
  }

  async FindByPhoneNumber(phoneNumber: string) {
    const doctorFindByPhoneNumber = await this.doctorRepository.findOneBy({
      phone_number: phoneNumber,
    });

    if (!doctorFindByPhoneNumber) {
      throw new NotFoundException('Doutor não encontrado');
    }

    return doctorFindByPhoneNumber;
  }

  async FindByAddress(address: string) {
    const doctorFindByAddress = await this.doctorRepository.findOneBy({
      address: address,
    });

    if (!doctorFindByAddress) {
      throw new NotFoundException('Doutor não encontrado');
    }

    return doctorFindByAddress;
  }
}
