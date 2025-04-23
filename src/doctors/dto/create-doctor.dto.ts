import {
  IsEmail,
  IsEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Max,
} from 'class-validator';

export class CreateDoctorDTO {
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
    message: 'campo "email" deve ter no mínimo 13 e no máximo 50 caracteres',
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
    message: 'campo "especialidade" não preenchido',
  })
  @IsString()
  @Max(100, {
    message: 'campo "especialidade" deve ter no máximo 100 caracteres',
  })
  readonly specialty: string;

  @IsEmpty({
    message: 'campo "crm" não preenchido',
  })
  @IsString()
  @Length(13, 13, {
    message: 'campo "crm" deve estar no formato CRM/SP 111000',
  })
  readonly crm: string;

  @IsEmpty({
    message: 'campo "grau de formação" não preenchido',
  })
  @IsString()
  @Max(25, {
    message: 'campo "grau de formação" deve ter no máximo 25 caracteres',
  })
  readonly academic_degree: string;

  @IsEmpty({
    message: 'campo "situação" não preenchido',
  })
  @IsString()
  @Max(9, {
    message: 'campo "situação" deve ser "empregado" ou "demitido',
  })
  readonly situation: string;

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
