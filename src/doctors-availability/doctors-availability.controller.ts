import { Body, Controller, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { AntiStatementUrl } from 'src/common/pipes/commom-pipes/anti-statements-url.pipe';
import { ParseToHourPipeUpdate } from 'src/common/pipes/commom-pipes/hour-validation-update.pipe';
import { ParseToHourPipe } from 'src/common/pipes/commom-pipes/hour-validation.pipe';
import { UUIDValidatorForUpdates } from 'src/common/pipes/commom-pipes/uuid-validation-updates.pipe';
import { DoctorsAvailabilityUpdateSelfRestrictions } from 'src/common/pipes/update-restrictions/doctors-availability/update-self.pipe';
import { DoctorsAvailabilityService } from './doctors-availability.service';
import { CreateDoctorsAvailabilityDTO } from './dto/create-da.dto';
import { UpdateDoctorsAvailabilityAdminDTO } from './dto/update-da-admin.dto';
import { UpdateDoctorsAvailabilityDTO } from './dto/update-da.dto';

@Controller('doctors-availability')
export class DoctorsAvailabilityController {
  constructor(
    private readonly doctorsAvailabilityService: DoctorsAvailabilityService,
  ) {}

  @Post()
  @UsePipes(ParseToHourPipe)
  Crete(@Body() body: CreateDoctorsAvailabilityDTO) {
    return this.doctorsAvailabilityService.Create(body);
  }

  @Patch('/update/self/:id')
  @UsePipes(
    AntiStatementUrl,
    UUIDValidatorForUpdates,
    DoctorsAvailabilityUpdateSelfRestrictions,
    ParseToHourPipeUpdate,
  )
  UpdateSelf(
    @Param('id') id: string,
    @Body() updateDoctorsAvailabilityDTO: UpdateDoctorsAvailabilityDTO,
  ) {
    return this.doctorsAvailabilityService.UpdateSelf(
      id,
      updateDoctorsAvailabilityDTO,
    );
  }

  @Patch('/update/admin/:id')
  @UsePipes(AntiStatementUrl, UUIDValidatorForUpdates, ParseToHourPipeUpdate)
  UpdateAdmin(
    @Param('id') id: string,
    @Body()
    updateDoctorsAvailabilityAdminDTO: UpdateDoctorsAvailabilityAdminDTO,
  ) {
    return this.doctorsAvailabilityService.UpdateAdmin(
      id,
      updateDoctorsAvailabilityAdminDTO,
    );
  }
}
