import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { DoctorsAvailability } from 'src/doctors-availability/entities/doctors-availability.entity';

export class CreateDoctorDTO {
  @IsNotEmpty({
    message: 'campo "cpf" não preenchido',
  })
  @IsString({
    message: 'campo "cpf" deve estar em formato de texto',
  })
  @Length(14, 14, {
    message: 'O cpf deve estar no formato 000.000.000-00',
  })
  readonly cpf: string;

  @IsNotEmpty({
    message: 'campo "email" não preenchido',
  })
  @IsString({
    message: 'campo "email" deve estar em formato de texto',
  })
  @IsEmail()
  @Length(13, 50, {
    message: 'campo "email" deve ter no mínimo 13 e no máximo 50 caracteres',
  })
  readonly email: string;

  @IsNotEmpty({
    message: 'campo "nome" não preenchido',
  })
  @IsString({
    message: 'campo "nome" deve estar em formato de texto',
  })
  @Length(0, 125, {
    message: 'campo "nome" deve ter no máximo 125 caracteres',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword({
  //   minLength: 12,
  //   minLowercase: 2,
  //   minNumbers: 2,
  //   minSymbols: 2,
  //   minUppercase: 2,
  // })
  readonly password_hash: string;

  @IsNotEmpty({
    message: 'campo "especialidade" não preenchido',
  })
  @IsString({
    message: 'campo "especialidade" deve estar em formato de texto',
  })
  @Length(0, 100, {
    message: 'campo "especialidade" deve ter no máximo 100 caracteres',
  })
  readonly specialties: string;

  @IsNotEmpty({
    message: 'campo "crm" não preenchido',
  })
  @IsString({
    message: 'campo "crm" deve estar em formato de texto',
  })
  @Length(13, 13, {
    message: 'campo "crm" deve estar no formato CRM/SP 111000',
  })
  readonly crm: string;

  @IsNotEmpty({
    message: 'campo "grau de formação" não preenchido',
  })
  @IsString({
    message: 'campo "grau de formação" deve estar em formato de texto',
  })
  @Length(0, 25, {
    message: 'campo "grau de formação" deve ter no máximo 25 caracteres',
  })
  readonly academic_degree: string;

  @IsNotEmpty({
    message: 'campo "situação" não preenchido',
  })
  @IsString({
    message: 'campo "situação" deve estar em formato de texto',
  })
  @Length(8, 9, {
    message: 'campo "situação" deve ser "empregado" ou "demitido',
  })
  readonly situation: string;

  @IsNotEmpty({
    message: 'campo "início da jornada de trabalho" não preenchido',
  })
  readonly workday_begin: string;

  @IsNotEmpty({
    message: 'campo "término da jornada de trabalho" não preenchido',
  })
  readonly workday_end: string;

  @IsNotEmpty({
    message: 'campo "telefone" não preenchido',
  })
  @IsString({
    message: 'campo "telefone" deve estar em formato de texto',
  })
  @Length(15, 15, {
    message: 'campo "telefone" deve ter estar no format (00) 00000 0000 ',
  })
  readonly phone_number: string;

  @IsNotEmpty({
    message: 'campo "endereço" não preenchido',
  })
  @IsString({
    message: 'campo "endereço" deve estar em formato de texto',
  })
  @Length(0, 100, {
    message: 'O campo "endereço não deve passar dos 100 caracteres',
  })
  readonly address: string;

  @IsOptional()
  readonly availability: DoctorsAvailability[];
}
