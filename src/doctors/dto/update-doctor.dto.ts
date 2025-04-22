import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateDoctorDTO } from './create-doctor.dto';

export class UpdateDoctorDTO extends PartialType(CreateDoctorDTO) {
  @IsNotEmpty({
    message: 'O campo "cpf" não deve ser atualizado',
  })
  readonly cpf: string;

  @IsNotEmpty({
    message: 'O campo "crm" não deve ser atualizado',
  })
  readonly crm: string;
}
