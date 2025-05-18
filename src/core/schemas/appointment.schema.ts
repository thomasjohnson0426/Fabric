import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ required: true }) patientId: string;
  @Prop({ required: true }) doctor: string;
  @Prop({ required: true }) appointmentDate: Date;
  @Prop() reason: string;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
export type AppointmentDocument = Appointment & Document;
