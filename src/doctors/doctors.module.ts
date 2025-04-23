import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsController } from './doctors.controller';
import { Doctor } from './entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
