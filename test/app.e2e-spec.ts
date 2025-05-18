import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Healthcare API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await app.init();
  });

  it('/patients (POST) - Create a patient', async () => {
    const response = await request(app.getHttpServer())
      .post('/patients')
      .send({ name: 'John Doe', age: 30, gender: 'Male', contact: '555-1234' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });

  it('/patients (GET) - List all patients', async () => {
    const response = await request(app.getHttpServer())
      .get('/patients')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/patients/:id (GET) - Get patient by ID', async () => {
    const response = await request(app.getHttpServer())
      .post('/patients')
      .send({
        name: 'Jane Doe',
        age: 25,
        gender: 'Female',
        contact: '555-6789',
      })
      .expect(201);

    const patientId = response.body.id;

    await request(app.getHttpServer())
      .get(`/patients/${patientId}`)
      .expect(200);
  });

  afterAll(async () => {
      await app.close();
      await new Promise((resolve) => setTimeout(resolve, 1000));
  });
});
