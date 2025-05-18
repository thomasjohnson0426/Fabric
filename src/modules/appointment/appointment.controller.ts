import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { UploadFileDto } from './DTOs/upload-file.dto';
import { AppointmentResponseDto } from './DTOs/appointment-response.dto';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly svc: AppointmentService) {}

  @Get()
  @ApiOkResponse({ type: [AppointmentResponseDto] })
  findAll(
    @Query('patientId') patientId?: string,
    @Query('doctor') doctor?: string,
  ) {
    return this.svc.findAll({ patientId, doctor });
  }

  @Get(':id')
  @ApiOkResponse({ type: AppointmentResponseDto })
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'CSV enqueued for processing' })
  enqueueCsv(@Body() dto: UploadFileDto) {
    return this.svc.enqueueCsv(dto.filepath);
  }
}