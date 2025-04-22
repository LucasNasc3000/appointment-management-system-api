import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreatePatientDTO } from './create-patient.dto';

export class UpdatePatientDTO extends PartialType(CreatePatientDTO) {
  @IsNotEmpty({
    message: 'O campo "cpf" não deve ser atualizado',
  })
  readonly cpf: string;
}
