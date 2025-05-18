import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AppointmentCsvProcessor } from '../core/queue/processors/appointment-csv.processor';
import { Model } from 'mongoose';

describe('AppointmentCsvProcessor', () => {
  let processor: AppointmentCsvProcessor;
  const mockModel = { create: jest.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppointmentCsvProcessor,
        { provide: getModelToken('Appointment'), useValue: mockModel },
      ],
    }).compile();

    processor = module.get<AppointmentCsvProcessor>(AppointmentCsvProcessor);
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });
});
