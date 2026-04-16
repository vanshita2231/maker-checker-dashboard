# Maker Checker Dashboard

Full-stack Maker-Checker workflow application with:
- `backend`: Spring Boot (Java 17), Spring Web, Spring Data JPA, H2 database
- `frontend`: React app (Create React App)

## Project Structure

```
vanshita/
├── backend/    # Spring Boot API
└── frontend/   # React UI
```

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+ and npm

## Run Backend

From the `backend` directory:

```bash
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

H2 console is enabled and available at:
`http://localhost:8080/h2-console`

## Run Frontend

From the `frontend` directory:

```bash
npm install
npm start
```

Frontend runs on `http://localhost:3000`.

## Build

Backend:

```bash
cd backend
mvn clean package
```

Frontend:

```bash
cd frontend
npm run build
```

## Notes

- Backend uses in-memory H2 database (`jdbc:h2:mem:makerchecker`).
- Uploaded files are stored under `backend/uploads`.
