import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { CreateDoctorDTO } from './create-doctor.dto';

export class UpdateDoctorDTO extends PartialType(CreateDoctorDTO) {
  @IsEmpty({
    message: 'O campo "cpf" não deve ser atualizado',
  })
  readonly cpf: string;

  @IsEmpty({
    message: 'O campo "crm" não deve ser atualizado',
  })
  readonly crm: string;

  @IsEmpty({
    message: 'O campo "especialidades" não deve ser atualizado',
  })
  readonly specialties: string;

  @IsEmpty({
    message: 'O campo "grau de formação" não deve ser atualizado',
  })
  readonly academic_degree: string;

  @IsEmpty({
    message: 'O campo "situação" não deve ser atualizado',
  })
  readonly situation: string;

  @IsEmpty({
    message: 'O campo "início da jornada de trabalho" não deve ser atualizado',
  })
  readonly workday_begin: string;

  @IsEmpty({
    message: 'O campo "término da jornada de trabalho" não deve ser atualizado',
  })
  readonly workday_end: string;
}
