import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientRepository } from './patient.repository';
import { CreatePatientDto } from './DTOs/create-patient.dto';
import { PatientResponseDto } from './DTOs/patient-response.dto';
import { PatientDocument } from 'src/core/schemas/patient.schema';

@Injectable()
export class PatientService {
  constructor(private readonly repo: PatientRepository) {}

  async create(dto: CreatePatientDto): Promise<PatientResponseDto> {
    const patient = await this.repo.create(dto as Partial<PatientDocument>);
    return this.toDto(patient);
  }

  async findAll(): Promise<PatientResponseDto[]> {
    const list = await this.repo.findAll();
    return list.map((p) => this.toDto(p));
  }

  async findOne(id: string): Promise<PatientResponseDto> {
    const p = await this.repo.findOneById(id);
    if (!p) throw new NotFoundException(`Patient with ID ${id} not found`);
    return this.toDto(p);
  }

  private toDto(p: PatientDocument): PatientResponseDto {
    return {
      id: p._id!.toString(),
      name: p.name,
      age: p.age,
      gender: p.gender,
      contact: p.contact,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}