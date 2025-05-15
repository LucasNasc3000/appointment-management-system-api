import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}

  @Post()
  Create(@Body() body: CreatePatientDTO) {
    return this.patientService.Create(body);
  }

  @Patch(':id')
  Update(@Param('id') id: string, @Body() updatePatientDTO: UpdatePatientDTO) {
    return this.patientService.Update(id, updatePatientDTO);
  }
}
