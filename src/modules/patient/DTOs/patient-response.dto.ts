import { ApiProperty } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() age: number;
  @ApiProperty() gender: string;
  @ApiProperty() contact: string;
  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}
