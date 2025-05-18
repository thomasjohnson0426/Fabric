import { Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../schemas/patient.schema';
import { Appointment, AppointmentSchema } from '../schemas/appointment.schema';

export const mongoProviders: Provider[] = [];

export const DatabaseImports = [
  MongooseModule.forFeature([
    { name: Patient.name, schema: PatientSchema },
    { name: Appointment.name, schema: AppointmentSchema },
  ]),
];
