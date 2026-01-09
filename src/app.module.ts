import { PracticeService } from './modules/practice/practice.service';
import { PracticeController } from './modules/practice/practice.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { adminConfig, getDatabaseConfig, googleCloudConfig, jwtConfig, smtpConfig } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { OpenDentalModule } from './modules/opendental/opendental.module';
import { OpenDentalController } from './modules/opendental/opendental.controller';
import opendentalConfig from './config/opendental.config';
import { ClinicKeysModule } from './modules/clinic-keys/clinic-keys.module';
import { AuditModule } from './modules/audit/audit.module';
import { PatientModule } from './modules/patient/patient.module';
import { PracticeModule } from './modules/practice/practice.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [getDatabaseConfig, jwtConfig, adminConfig, googleCloudConfig, smtpConfig, opendentalConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    CommonModule,
    AuditModule,
    ClinicKeysModule,
    OpenDentalModule,
    PatientModule,
    PracticeModule,
  ],
  controllers: [
    PracticeController, AppController, OpenDentalController],
  providers: [
    PracticeService, AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(ClinicContextMiddleware).forRoutes('*');
  // }
}