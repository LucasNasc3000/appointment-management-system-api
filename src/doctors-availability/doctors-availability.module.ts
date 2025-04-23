import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsAvailabilityController } from './doctors-availability.controller';
import { DoctorsAvailability } from './entities/doctors-availability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorsAvailability])],
  controllers: [DoctorsAvailabilityController],
})
export class DoctorsAvailabilityModule {}
