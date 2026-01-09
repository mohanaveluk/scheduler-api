import { Module } from '@nestjs/common';

import { ClinicKeysService } from './clinic-keys.service';
import { ClinicKeysRepository } from './clinic-keys.repository';
import { ClinicContext } from '../../common/context/clinic-context.provider';


@Module({
  providers: [ClinicKeysRepository, ClinicContext, ClinicKeysService],
  exports: [ClinicKeysService],
})
export class ClinicKeysModule {}