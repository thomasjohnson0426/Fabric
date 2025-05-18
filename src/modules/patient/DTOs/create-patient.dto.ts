import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsInt() @Min(0) age: number;
  @ApiProperty() @IsString() gender: string;
  @ApiProperty() @IsString() contact: string;
}
