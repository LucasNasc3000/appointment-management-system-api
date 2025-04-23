import {
  IsEmail,
  IsEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Max,
} from 'class-validator';

export class CreateEmployeeDTO {
  @IsEmpty({
    message: 'campo "cpf" não preenchido',
  })
  @IsString()
  @Length(14, 14, {
    message: 'O cpf deve estar no formato 000.000.000-00',
  })
  readonly cpf: string;

  @IsEmpty({
    message: 'campo "email" não preenchido',
  })
  @IsString()
  @IsEmail()
  @Length(13, 50, {
    message: 'O campo "email" deve ter no mínimo 13 e no máximo 50 caracteres',
  })
  readonly email: string;

  @IsEmpty({
    message: 'campo "nome" não preenchido',
  })
  @IsString()
  @Max(125, {
    message: 'campo "nome" deve ter no máximo 125 caracteres',
  })
  readonly name: string;

  @IsEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 2,
    minNumbers: 2,
    minSymbols: 2,
    minUppercase: 2,
  })
  readonly password_hash: string;

  @IsEmpty({
    message: 'campo "função" não preenchido',
  })
  @IsString()
  @Length(5, 15, {
    message: 'campo "função" deve ter no mínimo 5 e no máximo 15 caracteres',
  })
  readonly role: string;

  @IsEmpty({
    message: 'campo "início da jornada de trabalho" não preenchido',
  })
  readonly workday_begin: string;

  @IsEmpty({
    message: 'campo "término da jornada de trabalho" não preenchido',
  })
  readonly workday_end: string;

  @IsEmpty({
    message: 'campo "telefone" não preenchido',
  })
  @IsString()
  @Length(15, 15, {
    message: 'campo "telefone" deve ter estar no format (00) 00000 0000 ',
  })
  readonly phone_number: string;

  @IsEmpty({
    message: 'campo "endereço" não preenchido',
  })
  @IsString()
  @Max(100, {
    message: 'O campo "endereço não deve passar dos 100 caracteres',
  })
  readonly address: string;
}
