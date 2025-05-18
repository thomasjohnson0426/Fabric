import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AppointmentRepository } from './appointment.repository';
import { UploadFileDto } from './DTOs/upload-file.dto';
import { AppointmentResponseDto } from './DTOs/appointment-response.dto';
import { AppointmentDocument } from 'src/core/schemas/appointment.schema';

@Injectable()
export class AppointmentService {
  private readonly QUEUE_NAME = process.env.QUEUE_NAME || 'appointments-csv';

  constructor(
    private readonly repo: AppointmentRepository,
    @InjectQueue(process.env.QUEUE_NAME || 'appointments-csv')
    private readonly queue: Queue,
  ) {}

  async findAll(filter: { patientId?: string; doctor?: string }) {
    const mongoFilter: Record<string, any> = {};
    if (filter.patientId) {
      mongoFilter.patientId = filter.patientId;
    }
    if (filter.doctor) {
      mongoFilter.doctor = filter.doctor;
    }

    const appts = await this.repo.findAll(mongoFilter);
    return appts.map((a) => this.toDto(a));
  }

  async findOne(id: string) {
    const a = await this.repo.findOneById(id);
    if (!a) throw new NotFoundException(`Appointment ${id} not found`);
    return this.toDto(a);
  }

  async enqueueCsv(filepath: string): Promise<{ enqueued: boolean }> {
    await this.queue.add('process-csv', { filepath });
    return { enqueued: true };
  }

  async create(data: {
    patientId: string;
    doctor: string;
    appointmentDate: Date;
    reason: string;
  }): Promise<AppointmentResponseDto> {
    const raw = await this.repo.create(data as Partial<AppointmentDocument>);
    return this.toDto(raw);
  }

  private toDto(a: AppointmentDocument): AppointmentResponseDto {
    return {
      id: a._id!.toString(),
      patientId: a.patientId,
      doctor: a.doctor,
      appointmentDate: a.appointmentDate,
      reason: a.reason,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    };
  }
}
