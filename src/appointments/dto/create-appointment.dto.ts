import { IsDate, IsEmpty, IsString, IsUUID, Length } from 'class-validator';

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
  @IsString({
    message: 'campo "formato" deve estar em formato de texto',
  })
  @Length(6, 10, {
    message: 'campo "formato" deve ser "online" ou "presencial"',
  })
  readonly format: string;
  // formato de text, msg isString

  @IsEmpty({
    message: 'campo "doctor_id" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "doctor_id" deve ser um uuid',
  })
  readonly doctor_id: string;

  @IsEmpty({
    message: 'campo "patient_id" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "patient_id" deve ser um uuid',
  })
  readonly patient_id: string;

  @IsEmpty({
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
