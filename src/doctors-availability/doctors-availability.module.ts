import { Module } from '@nestjs/common';
import { DoctorsAvailabilityController } from './doctors-availability.controller';

@Module({
  controllers: [DoctorsAvailabilityController],
})
export class DoctorsAvailabilityModule {}
