import { Body, Controller, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { AntiStatementUrl } from 'src/common/pipes/anti-statements-url.pipe';
import { ParseToHourPipeUpdate } from 'src/common/pipes/hour-validation-update.pipe';
import { ParseToHourPipe } from 'src/common/pipes/hour-validation.pipe';
import { DoctorUpdateAdminRestrictions } from 'src/common/pipes/updateRestrictions/doctor/update-admin.pipe';
import { DoctorUpdateSelfRestrictions } from 'src/common/pipes/updateRestrictions/doctor/update-self.pipe';
import { UUIDValidatorForUpdates } from 'src/common/pipes/uuid-validation-updates.pipe';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDTO } from './dto/create-doctor.dto';
import { UpdateDoctorAdminDTO } from './dto/update-doctor-admin.dto';
import { UpdateDoctorDTO } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @UsePipes(ParseToHourPipe)
  Create(@Body() body: CreateDoctorDTO) {
    return this.doctorsService.Create(body);
  }

  @Patch('/update/self/:id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    DoctorUpdateSelfRestrictions,
    ParseToHourPipeUpdate,
  )
  UpdateSelf(
    @Param('id') id: string,
    @Body() updateDoctorDTO: UpdateDoctorDTO,
  ) {
    return this.doctorsService.UpdateSelf(id, updateDoctorDTO);
  }

  @Patch('/update/admin/:id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    DoctorUpdateAdminRestrictions,
    ParseToHourPipeUpdate,
  )
  UpdateAdmin(
    @Param('id') id: string,
    @Body() updateDoctorAdminDTO: UpdateDoctorAdminDTO,
  ) {
    return this.doctorsService.UpdateAdmin(id, updateDoctorAdminDTO);
  }
}
