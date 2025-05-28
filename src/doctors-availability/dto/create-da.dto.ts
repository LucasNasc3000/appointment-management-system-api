import { IsDate, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import { Doctor } from 'src/doctors/entities/doctor.entity';

export class CreateDoctorsAvailabilityDTO {
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
  readonly hour_from: string;

  @IsNotEmpty({
    message: 'campo "hora término" não preenchido',
  })
  readonly hour_to: string;

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
    message: 'campo "doctor_id" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "doctor_id" deve ser um uuid',
  })
  readonly doctor: Doctor;
}
