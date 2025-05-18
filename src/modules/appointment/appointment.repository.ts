import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../shared/base.repository';
import { Appointment, AppointmentDocument } from '../../core/schemas/appointment.schema';


@Injectable()
export class AppointmentRepository extends BaseRepository<AppointmentDocument> {
  constructor(
    @InjectModel(Appointment.name)
    protected readonly model: Model<AppointmentDocument>,
  ) {
    super(model);
  }
}