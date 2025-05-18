import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../shared/base.repository';
import { Patient, PatientDocument } from '../../core/schemas/patient.schema';

@Injectable()
export class PatientRepository extends BaseRepository<PatientDocument> {
  constructor(
    @InjectModel(Patient.name)
    protected readonly model: Model<PatientDocument>,
  ) {
    super(model);
  }
}
