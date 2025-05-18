import { ApiProperty } from '@nestjs/swagger';

export class AppointmentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() patientId: string;
  @ApiProperty() doctor: string;
  @ApiProperty() appointmentDate: Date;
  @ApiProperty() reason?: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
