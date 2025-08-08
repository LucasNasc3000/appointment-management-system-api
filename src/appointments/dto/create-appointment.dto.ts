import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';

export class CreateAppointmentDTO {
  @IsNotEmpty({
    message: 'campo "data" não preenchido',
  })
  readonly date: string;

  @IsNotEmpty({
    message: 'campo "hora início" não preenchido',
  })
  readonly hour: string;

  @IsString({
    message: 'campo "formato" deve estar em formato de texto',
  })
  @Length(6, 10, {
    message: 'campo "formato" deve ser "online" ou "presencial"',
  })
  readonly format: string;
  // formato de text, msg isString

  @IsNotEmpty({
    message: 'campo "doctor" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "doctor" deve ser um uuid',
  })
  readonly doctor: Doctor;

  @IsNotEmpty({
    message: 'campo "patient" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "patient" deve ser um uuid',
  })
  readonly patient: Patient;

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
