import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorsAvailabilityDTO } from './create-da.dto';

export class UpdateDoctorsAvailabilityAdminDTO extends PartialType(
  CreateDoctorsAvailabilityDTO,
) {}
