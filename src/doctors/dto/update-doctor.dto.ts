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
}
