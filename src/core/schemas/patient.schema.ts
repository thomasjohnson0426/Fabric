import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Patient extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, min: 0 }) age: number;
  @Prop({ required: true }) gender: string;
  @Prop({ required: true }) contact: string;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
export type PatientDocument = Patient & Document;
