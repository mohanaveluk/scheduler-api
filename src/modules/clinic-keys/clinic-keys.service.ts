import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { ClinicKeysRepository } from './clinic-keys.repository';
import { ClinicContext } from '../../common/context/clinic-context.provider';
import { IntegerType } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class ClinicKeysService {
  private cache = new Map<string, any>();

  constructor(
    private readonly repo: ClinicKeysRepository,
    private readonly clinicContext: ClinicContext,
  ) {}

  async getKeys() {

    const practiceGuid = this.clinicContext.practiceGuid;

    if (this.cache.has(practiceGuid.toString())) {
      return this.cache.get(practiceGuid.toString());
    }
    const keys = await this.repo.findActiveByClinicId(practiceGuid.toString());

    if (!keys) {
      throw new UnauthorizedException(
        `OpenDental keys not configured for clinic ${practiceGuid}`,
      );
    }
    this.cache.set(practiceGuid.toString(), keys);

    return {
      developerKey: keys.developer_key,
      customerKey: keys.customer_key,
    };
  }
}