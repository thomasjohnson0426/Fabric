import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '../../schemas/appointment.schema';

const QUEUE_NAME = process.env.QUEUE_NAME || 'appointments-csv';

@Processor(QUEUE_NAME)
export class AppointmentCsvProcessor {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  @Process()
  async handle(job: Job<{ filepath: string }>) {
    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(job.data.filepath)
        .pipe(csv())
        .on('data', async (row) => {
          await this.appointmentModel.create({
            patientId: row.patientId,
            doctor: row.doctor,
            appointmentDate: new Date(row.appointmentDate),
            reason: row.reason,
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });
  }
}
