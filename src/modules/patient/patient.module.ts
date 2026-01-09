import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenDentalService } from '../opendental/opendental.service';
import { ClinicKeysModule } from '../clinic-keys/clinic-keys.module';
import { ClinicContext } from 'src/common/context/clinic-context.provider';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

@Module({
  imports: [HttpModule, ClinicKeysModule],
  controllers: [PatientController],
  providers: [OpenDentalService, PatientService, ClinicContext],
  exports: [PatientService],
})
export class PatientModule {}