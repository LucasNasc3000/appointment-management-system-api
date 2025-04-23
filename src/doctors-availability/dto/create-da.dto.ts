import { IsDate, IsEmpty, IsString, IsUUID, Max } from 'class-validator';

export class CreateDoctorsAvailabilityDTO {
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
  readonly hour_from: string;

  @IsEmpty({
    message: 'campo "hora término" não preenchido',
  })
  readonly hour_to: string;

  @IsEmpty({
    message: 'campo "situação" não preenchido',
  })
  @IsString()
  @Max(9, {
    message: 'campo "situação" deve ser "empregado" ou "demitido',
  })
  readonly situation: string;

  @IsEmpty({
    message: 'campo "doctor_id" não preenchido',
  })
  @IsUUID(4, {
    message: 'campo "doctor_id" deve ser um uuid',
  })
  readonly doctor_id: string;
}
