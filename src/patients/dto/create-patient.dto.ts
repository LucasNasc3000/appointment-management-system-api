import { IsEmail, IsEmpty, IsString, Length, Max } from 'class-validator';

export class CreatePatientDTO {
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

  @IsEmpty({
    message: 'campo "endereço" não preenchido',
  })
  @IsString()
  @Max(100, {
    message: 'O campo "endereço não deve passar dos 100 caracteres',
  })
  readonly address: string;

  @IsEmpty({
    message: 'campo "telefone" não preenchido',
  })
  @IsString()
  @Length(15, 15, {
    message: 'campo "telefone" deve ter estar no formato (00) 00000 0000 ',
  })
  readonly phone_number: string;
}
