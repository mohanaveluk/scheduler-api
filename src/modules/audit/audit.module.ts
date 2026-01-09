import { Module } from "@nestjs/common";
import { AuditRepository } from "./audit.repository";
import { AuditInterceptor } from "./audit.interceptor";
import { ClinicContext } from "src/common/context/clinic-context.provider";

@Module({
  providers: [AuditRepository, AuditInterceptor, ClinicContext],
})
export class AuditModule {}