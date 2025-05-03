import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePatientDTO {
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
    message: 'O campo "email" deve ter no mínimo 13 e no máximo 50 caracteres',
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

  @IsNotEmpty({
    message: 'campo "telefone" não preenchido',
  })
  @IsString({
    message: 'campo "telefone" deve estar em formato de texto',
  })
  @Length(15, 15, {
    message: 'campo "telefone" deve ter estar no formato (00) 00000 0000 ',
  })
  readonly phone_number: string;
}
