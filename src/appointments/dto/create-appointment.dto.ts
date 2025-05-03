import { IsDate, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateAppointmentDTO {
  @IsNotEmpty({
    message: 'campo "data" não preenchido',
  })
  @IsDate({
    message: 'O campo "data" deve estar em formato de data',
  })
  readonly date: Date;

  @IsNotEmpty({
    message: 'campo "hora início" não preenchido',
  })
  readonly hour: string;

  @IsNotEmpty({
    message: 'campo "hora início" não preenchido',
  })
  @IsString({
    message: 'campo "formato" deve estar em formato de texto',
  })
  @Length(6, 10, {
    message: 'campo "formato" deve ser "online" ou "presencial"',
  })
  readonly format: string;
  // formato de text, msg isString

  @IsNotEmpty({
    message: 'campo "doctor_id" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "doctor_id" deve ser um uuid',
  })
  readonly doctor_id: string;

  @IsNotEmpty({
    message: 'campo "patient_id" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "patient_id" deve ser um uuid',
  })
  readonly patient_id: string;

  @IsNotEmpty({
    message: 'campo "status" não preenchido',
  })
  @IsString({
    message: 'campo "status" deve estar em formato de texto',
  })
  @Length(8, 12, {
    message:
      'campo "status" deve ser "cancelada", "reagendada", "agendada" ou "em andamento"',
  })
  readonly status: string;
}
