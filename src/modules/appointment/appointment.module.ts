import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import {
  Appointment,
  AppointmentSchema,
} from '../../core/schemas/appointment.schema';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentCsvProcessor } from '../../core/queue/processors/appointment-csv.processor';
import { AppointmentProcessor } from './appointment.processor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    BullModule.registerQueue({
      name: process.env.QUEUE_NAME || 'appointments-csv',
    }),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentRepository, AppointmentProcessor],
})
export class AppointmentModule {}