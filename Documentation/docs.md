# Healthcare API Documentation

## Project Overview

This project (Fabric Assessment) implements a REST API for managing patient records and appointments, plus an event-driven CSV/Excel import system. It uses NestJS with TypeScript, MongoDB for persistence, and Redis + Bull for background job processing.

---

## Running locally

1. npm install
2. npm run start:dev

## Running in Docker

1. docker-compose up --build -d

# api → NestJS app
# mongo → MongoDB
# redis → Redis queue broker

## Port mapping

1. API: 5000:5000
2. Mongo: 27017:27017
3. Redis: 6379:6379

## Testing

1. npm run test
2. npm run test:e2e

## Manual curl checks

# Create/list/get patients
# Enqueue & list appointments
# Filter by ?patientId= and ?doctor=


## API Endpoints

### Patients

#### POST /patients
- Creates a new patient.  
- Expects JSON without `id`.  
- Returns `201` + created patient.

#### GET /patients
- Returns `200` + array of patients.

#### GET /patients/:id
- Returns `200` + patient or `404` if not found.

### Appointments

#### POST /appointments
- Enqueue a CSV/XLSX file for processing.  
- Expects `{ "filepath": "<path>" }`.  
- Returns `200` + `{ enqueued: true }`.

#### GET /appointments
- Returns `200` + array of appointments.  
- Supports optional query `?patientId=` and `?doctor=`.

#### GET /appointments/:id
- Returns `200` + appointment or `404` if not found.

## Architecture & Patterns

- **Modular**: each feature is living in its own module folder.  
- **Dependency Injection**: services, repositories, and processors are injected by Nest.  
- **BaseRepository**: reusable CRUD methods by Mongoose.  
- **DTOs + ValidationPipe**: class-based validation on incoming requests.  
- **Swagger**: auto-generated API docs from decorators.

## Event-Driven CSV/Excel Import

1. Client calls `POST /appointments` with a file path.  
2. `AppointmentService.enqueueCsv()` adds a job to the Bull queue (Redis).  
3. `AppointmentProcessor` listens to the queue:
   - Detects file type (`.csv` or `.xlsx`).  
   - Parses rows (with `csv-parser` or `xlsx`).  
   - Calls `AppointmentService.create()` to save each record in MongoDB.  
4. Result: the import runs in the background, keeping the API non-blocking.
