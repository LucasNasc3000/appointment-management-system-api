import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { DoctorsAvailabilityModule } from 'src/doctors-availability/doctors-availability.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { PatientsModule } from 'src/patients/patients.module';
import appConfig from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(appConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: async (appConfigParam: ConfigType<typeof appConfig>) => {
        return {
          type: appConfigParam.database.type,
          host: appConfigParam.database.host,
          port: appConfigParam.database.port,
          username: appConfigParam.database.username,
          database: appConfigParam.database.database,
          password: appConfigParam.database.password,
          autoLoadEntities: appConfigParam.database.autoLoadEntities,
          synchronize: appConfigParam.database.synchronize,
        };
      },
    }),
    EmployeesModule,
    PatientsModule,
    DoctorsAvailabilityModule,
    DoctorsModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
