/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PracticeRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getPractice(practiceGuid: string) {
    const [rows] = await this.dataSource.query(
      `
        SELECT

            p.id,
            p.name,
            p.unique_id,
            p.address1,
            p.address2,
            p.city,
            p.state,
            p.zip,
            p.country,
            p.primary_phone,
            p.primary_email,
            p.dentist_name,
            p.logo_url,
            p.timezone
        FROM clinic p
        WHERE p.unique_id = ?
          AND p.active = 1
        LIMIT 1
      `,
      [practiceGuid],
    );
    return rows ?? null;
  }
    
}
