import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { DoctorsAvailabilityController } from './doctors-availability.controller';
import { DoctorsAvailabilityService } from './doctors-availability.service';
import { DoctorsAvailability } from './entities/doctors-availability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorsAvailability]), DoctorsModule],
  controllers: [DoctorsAvailabilityController],
  providers: [DoctorsAvailabilityService],
})
export class DoctorsAvailabilityModule {}
