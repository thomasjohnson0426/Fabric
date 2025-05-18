import { Test } from '@nestjs/testing';
import { PatientController } from '../modules/patient/patient.controller';
import { PatientService } from '../modules/patient/patient.service';

describe('PatientController', () => {
  let controller: PatientController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
