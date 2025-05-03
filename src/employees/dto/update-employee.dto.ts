import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { CreateEmployeeDTO } from './create-employee.dto';

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {
  @IsEmpty({
    message: 'O campo "cpf" não deve ser atualizado',
  })
  readonly cpf: string;

  @IsEmpty({
    message: 'O campo "função" não deve ser atualizado',
  })
  readonly role: string;

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
