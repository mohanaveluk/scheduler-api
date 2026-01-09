import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { AuditRepository } from './audit.repository';
import { ClinicContext } from '../../common/context/clinic-context.provider';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly auditRepo: AuditRepository,
    private readonly clinicContext: ClinicContext,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(async () => {
        await this.auditRepo.log({
          clinicId: this.clinicContext.getPracticeGuid(),
          apiName: 'OpenDental',
          method: request.method,
          endpoint: request.originalUrl,
          statusCode: 200,
          duration: Date.now() - start,
        });
      }),
    );
  }
}