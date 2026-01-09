import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenDentalService } from '../opendental/opendental.service';
import { ClinicKeysModule } from '../clinic-keys/clinic-keys.module';
import { PracticeController } from './practice.controller';
import { PracticeService } from './practice.service';
import { PracticeRepository } from './practice.repository';


@Module({
  imports: [HttpModule, ClinicKeysModule],
  controllers: [PracticeController],
  providers: [OpenDentalService, PracticeService, PracticeRepository],
  exports: [PracticeService, PracticeRepository],
})
export class PracticeModule {}