import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenDentalService } from './opendental.service';
import { ClinicKeysService } from '../clinic-keys/clinic-keys.service';
import { ClinicKeysModule } from '../clinic-keys/clinic-keys.module';
import { ClinicContext } from 'src/common/context/clinic-context.provider';

@Module({
  imports: [HttpModule, ClinicKeysModule],
  providers: [OpenDentalService, ClinicContext],
  exports: [OpenDentalService],
})
export class OpenDentalModule {}