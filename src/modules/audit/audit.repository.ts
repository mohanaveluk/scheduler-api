import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AuditRepository {
  constructor(private readonly dataSource: DataSource) {}

  async log(entry: any) {
    await this.dataSource.query(
      `
      INSERT INTO clinic_audit_logs
      (clinic_id, api_name, http_method, endpoint, status_code, response_time_ms)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        entry.clinicId,
        entry.apiName,
        entry.method,
        entry.endpoint,
        entry.statusCode,
        entry.duration,
      ],
    );
  }
}