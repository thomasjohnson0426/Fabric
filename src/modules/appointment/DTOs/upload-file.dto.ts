import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({ description: 'Path to CSV file' })
  @IsString()
  filepath: string;
}
