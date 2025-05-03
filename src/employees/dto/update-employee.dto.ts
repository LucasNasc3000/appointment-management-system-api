import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { CreateEmployeeDTO } from './create-employee.dto';

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {
  @IsEmpty({
    message: 'O campo "cpf" não deve ser atualizado',
  })
  readonly cpf: string;
}
