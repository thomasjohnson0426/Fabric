import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';

import configuration from './core/configs/configuration';
import { mongoProviders } from './core/database/mongo.provider';
import { bullConfig } from './core/queue/bull.config';

import { PatientModule } from './modules/patient/patient.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:  'mongodb://localhost:27017/healthcare',
      }),
    }),
    BullModule.forRoot({
      redis: {
        host:  'localhost',
        port: parseInt('6379', 10),
      },
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 20 } as any),
    PatientModule,
    AppointmentModule,
  ],
})
export class AppModule {}
