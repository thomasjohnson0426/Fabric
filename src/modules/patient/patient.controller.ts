import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './DTOs/create-patient.dto';
import { PatientResponseDto } from './DTOs/patient-response.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly svc: PatientService) {}

  @Post()
  @ApiCreatedResponse({ type: PatientResponseDto })
  create(@Body() dto: CreatePatientDto) {
    return this.svc.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: [PatientResponseDto] })
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PatientResponseDto })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }
}