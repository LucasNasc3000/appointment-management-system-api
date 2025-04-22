import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateEmployeeDTO } from './create-employee.dto';

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {
  @IsNotEmpty({
    message: 'O campo "cpf" não pode ser atualizado',
  })
  readonly cpf?: string;
}
