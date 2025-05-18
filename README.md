# Fabric Healthcare API

## Setup

1. `docker-compose up -d --build`
2. `npm run test`
3. API docs: http://localhost:5000/docs

## Notes

- Patients: `/patients`
- Appointments: `/appointments` & `/appointments/upload` (POST CSV path)
- Throttling, logging, validation, Swagger, OTel are pre-configured
