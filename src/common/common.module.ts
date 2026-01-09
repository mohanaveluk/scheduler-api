import { Module, Global } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthorizationGuard } from './guards/jwt-authorization.guard';
import { ClinicContextGuard } from './guards/clinic-context.guard';

@Global()
@Module({
  providers: [
    JwtAuthGuard,
    RolesGuard,
    AuthorizationGuard
  ],
  exports: [
    JwtAuthGuard,
    RolesGuard,
    AuthorizationGuard,
    ClinicContextGuard
  ],
})
export class CommonModule {}