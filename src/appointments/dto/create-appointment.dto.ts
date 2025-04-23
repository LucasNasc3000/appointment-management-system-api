import { IsDate, IsEmpty, IsString, Length } from 'class-validator';

export class CreateAppointmentDTO {
  @IsEmpty({
    message: 'campo "data" não preenchido',
  })
  @IsDate({
    message: 'O campo "data" deve estar em formato de data',
  })
  readonly date: Date;

  @IsEmpty({
    message: 'campo "hora início" não preenchido',
  })
  readonly hour: string;

  @IsEmpty({
    message: 'campo "hora início" não preenchido',
  })
  @IsString()
  @Length(6, 10, {
    message: 'campo "formato" deve ser "online" ou "presencial"',
  })
  readonly format: string;
  // formato de text, msg isString
}
