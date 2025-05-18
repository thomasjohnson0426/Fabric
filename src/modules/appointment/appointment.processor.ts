import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as xlsx from 'xlsx';
import { join } from 'path';

const QUEUE_NAME = process.env.QUEUE_NAME || 'appointments-csv';

@Injectable()
@Processor(process.env.QUEUE_NAME || 'appointments-csv')
export class AppointmentProcessor {
  private readonly logger = new Logger(AppointmentProcessor.name);

  constructor(private readonly svc: AppointmentService) {}

  @Process('process-csv')
  async handleFile(job: Job<{ filepath: string }>) {
    const { filepath } = job.data;
    const fullPath = join(process.cwd(), filepath);
    this.logger.log(`Starting processing for file ${fullPath}`);

    try {
      let rows: any[];
      if (filepath.match(/\.xlsx?$/)) {
        this.logger.log('Detected Excel file');
        const wb = xlsx.readFile(fullPath);
        const sheet = wb.Sheets[wb.SheetNames[0]];
        rows = xlsx.utils.sheet_to_json(sheet);
      } else {
        this.logger.log('Detected CSV file');
        console.log('hit test+');

        rows = await this.parseCsv(fullPath);
      }
      this.logger.log(`Parsed ${rows.length} rows`);

      for (const r of rows) {
        await this.svc.create({
          patientId: r.patient_id?.toString() || r.patientId,
          doctor: r.doctor,
          appointmentDate: new Date(r.appointment_date || r.appointmentDate),
          reason: r.reason,
        });
      }

      this.logger.log('All appointments created successfully');
    } catch (err) {
      this.logger.error('Error processing file', err.stack);
      throw err;
    }
  }

  private parseCsv(path: string): Promise<any[]> {
    const out: any[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csv())
        .on('data', (row) => out.push(row))
        .on('end', () => resolve(out))
        .on('error', reject);
    });
  }
}
