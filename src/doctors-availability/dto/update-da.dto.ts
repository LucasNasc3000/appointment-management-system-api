import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorsAvailabilityDTO } from './create-da.dto';

export class UpdateDoctorsAvailabilityDTO extends PartialType(
  CreateDoctorsAvailabilityDTO,
) {}
